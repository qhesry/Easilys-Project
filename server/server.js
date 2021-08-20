import { getAllParties, addParty, removeParty, switchPartyState } from './partyFunctions.js';
import { connectToTchat, disconnectFromTchat, sendMessageToTchat } from './tchatFunctions.js';
import { initDB } from './database.js';
import { wss } from './utils.js';

//Initlize database.
const db = initDB();

//Initialize onMessage for the websocket with all the possibles messages that will be received from the client.
wss.on('connection', (ws) => {
    var handshakeMessage = {
        action: 'connectionEtablished'
    }
    ws.send(JSON.stringify(handshakeMessage));

    ws.on('message', data => {
        var content = JSON.parse(data);

        switch (content.action) {
            case 'getAllParties':
                getAllParties(db, ws);
                break;
            case 'createParty':
                addParty(db, ws, content);
                break;
            case 'removeParty':
                removeParty(db, ws, content);
                break;
            case 'switchPartyState':
                switchPartyState(db, ws, content);
                break;
            case 'connectToTchat':
                connectToTchat(db, ws, content);
                break;
            case 'disconnectFromTchat':
                disconnectFromTchat(db, ws, content);
                break;
            case 'sendMessageToTchat':
                sendMessageToTchat(db, ws, content);
                break;
            default:
                break;
        }
    });
})