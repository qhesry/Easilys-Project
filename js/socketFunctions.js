export { openConnectionSocket, initializeOnMessageSocket };
import * as PartyFunctions from './partyFunctions.js';
import * as TchatFunctions from './tchatFunctions.js';

export var socket;
var port = 3000;

//Open connection socket
function openConnectionSocket() {
    if (undefined === socket) {
        socket = new WebSocket('ws://localhost:' + port + '/');
    }
}

//Initialize onMessage for the websocket with all the possibles messages that will be received from the server.
function initializeOnMessageSocket() {
    socket.onmessage = data => {
        let content = JSON.parse(data.data);
        switch (content.action) {
            //message send from the server when a connection is etablished.
            case 'connectionEtablished':
                let getAllPartiesMessage = {
                    action: "getAllParties",
                }
                socket.send(JSON.stringify(getAllPartiesMessage));
                break;
            //message send from the server just after connection has been etablished.
            case "getAllParties":
                content.data.forEach(parties => {
                    PartyFunctions.addPartyToDocument(socket, parties);
                })
                break;
            //message send from the server when add party button has been clicked on.
            case "createParty":
                PartyFunctions.addPartyToDocument(socket, content);
                break;
            //message send from the server when remove party button has been clicked on.
            case "removeParty":
                PartyFunctions.removePartyFromDocument(content);
                break;
            //message send from the server when checkbox from a party has been clicked on.
            case "switchPartyState":
                PartyFunctions.switchPartyState(content);
                break;
            //message send from the server when connect button has been clicked on. It will add all old messages and all users already connected to the UI.
            case "connectToTchat":
                TchatFunctions.setMyUuid(content.uuid);
                TchatFunctions.setMyUsername(content.name);
                content.usersInfo.forEach(users => {
                    TchatFunctions.updateUserConnected(users);
                })
                content.tchatMessages.forEach(message => {
                    TchatFunctions.updateTchatMessages(message);
                })
                TchatFunctions.displayTchat(content);
                break;
            //message send from the server when disconnect button has been clicked on.
            case "disconnectFromTchat":
                TchatFunctions.setMyUuid("");
                TchatFunctions.setMyUsername("");
                TchatFunctions.closeTchat(content);
                break;
            //message send from the server when a new user is connected and the ui needs to be updated
            case "updateTchatUser":
                TchatFunctions.updateUserConnected(content);
                break;
            //message send from the server when a new message has been sent and the ui needs to be updated
            case "updateTchatMessages":
                TchatFunctions.updateTchatMessages(content);
                break;
            default:
                break;
        }
    }
};