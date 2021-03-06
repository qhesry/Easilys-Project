import { v4 as uuidv4 } from 'uuid';
import { broadcastMessageIncludingSelf } from './utils.js'

//Send to the client info for all parties currently registered.
export function getAllParties(db, ws) {
    db.query("SELECT * FROM PARTIES").then(partiesInfo => {
        var partiesInfoMessage = {
            action: 'getAllParties',
            data: partiesInfo
        };
        ws.send(JSON.stringify(partiesInfoMessage));
    }).catch(error => {
        console.log(error);
    })
}

//Add a party to the database and broadcast to every client that a new party has been added.
export function addParty(db, ws, content) {
    var newUUID = uuidv4();
    db.query("INSERT INTO PARTIES VALUES ($1, $2, $3)", [newUUID, content.name, false]).then(() => {
        var partyInfo = {
            action: 'createParty',
            uuid: newUUID,
            name: content.name,
            terminated: false,
        };
        broadcastMessageIncludingSelf(partyInfo);
    }).catch(error => {
        console.log(error);
    })
}

//Remove a party to the database and broadcast to every client that a party has been removed.
export function removeParty(db, ws, content) {
    db.query("DELETE FROM PARTIES WHERE uuid = $1", [content.uuid]).then(() => {
        var partyInfo = {
            action: 'removeParty',
            uuid: content.uuid,
        };
        broadcastMessageIncludingSelf(partyInfo)
    }).catch(error => {
        console.log(error);
    })
}

//Switch party state in database and broadcast to every client that the specified party has changed state.
export function switchPartyState(db, ws, content) {
    db.query('UPDATE PARTIES SET terminated = $1 WHERE uuid = $2', [content.terminated, content.uuid]).then(() => {
        var partyInfo = {
            action: 'switchPartyState',
            uuid: content.uuid,
            terminated: content.terminated
        };
        broadcastMessageIncludingSelf(partyInfo);
    }).catch(error => {
        console.log(error);
    })
}