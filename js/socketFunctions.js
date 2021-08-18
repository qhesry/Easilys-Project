export { openConnectionSocket, initializeOnMessageSocket };
import * as PartyFunctions from './partyFunctions.js';
import * as TchatFunctions from './tchatFunctions.js';

export var socket;
var port = 3000;

function openConnectionSocket() {
    if (undefined === socket) {
        socket = new WebSocket('ws://localhost:' + port + '/');
    }
}

function initializeOnMessageSocket() {
    socket.onmessage = data => {
        let content = JSON.parse(data.data);
        switch (content.action) {
            case 'connectionEtablished':
                let getAllPartiesMessage = {
                    action: "getAllParties",
                }
                socket.send(JSON.stringify(getAllPartiesMessage));
                break;
            case "getAllParties":
                content.data.forEach(parties => {
                    PartyFunctions.addPartyToDocument(socket, parties);
                })
                break;
            case "createParty":
                PartyFunctions.addPartyToDocument(socket, content);
                break;
            case "removeParty":
                PartyFunctions.removePartyFromDocument(content);
                break;
            case "switchPartyState":
                PartyFunctions.switchPartyState(content);
                break;
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
            case "disconnectFromTchat":
                TchatFunctions.setMyUuid("");
                TchatFunctions.setMyUsername("");
                TchatFunctions.closeTchat(content);
                break;
            case "updateTchatUser":
                TchatFunctions.updateUserConnected(content);
                break;
            case "updateTchatMessages":
                TchatFunctions.updateTchatMessages(content);
                break;
            default:
                break;
        }
    }
};