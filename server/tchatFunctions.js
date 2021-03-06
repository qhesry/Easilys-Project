import { v4 as uuidv4 } from 'uuid';
import { broadcastMessageIncludingSelf, broadcastMessageExcludingSelf } from './utils.js';

//Insert a message into the database and broadcast to every client that a new message has been send.
export function sendMessageToTchat(db, ws, content) {
    var newUUID = uuidv4();
    var time = Date.now();
    db.query('INSERT INTO MESSAGES VALUES ($1, $2, $3, $4)', [newUUID, content.username, content.message, time]).then(() => {
        var messageInfo = {
            action: "updateTchatMessages",
            uuid: newUUID,
            username: content.username,
            message: content.message,
            time: time
        }
        broadcastMessageIncludingSelf(messageInfo);
    }).catch(error => {
        console.log(error);
    })
}

//Insert new user into the database, send him all information for users already connected and all old messages then broadcast to every client that a new user is now connected.
export function connectToTchat(db, ws, content) {
    var newUUID = uuidv4();
    db.query('INSERT INTO TCHATUSERS VALUES ($1, $2)', [newUUID, content.name]).then(() => {
        db.query('SELECT * FROM TCHATUSERS').then(usersInfo => {
            db.query('SELECT * FROM (SELECT * FROM messages ORDER BY time DESC) AS messages ORDER BY time ASC').then(tchatData => {
                var tchatInfo = {
                    action: "connectToTchat",
                    connection: true,
                    uuid: newUUID,
                    name: content.name,
                    usersInfo: usersInfo,
                    tchatMessages: tchatData
                }
                ws.send(JSON.stringify(tchatInfo));
                var tchatConnection = {
                    action: "updateTchatUser",
                    connection: true,
                    uuid: newUUID,
                    name: content.name,
                }
                broadcastMessageExcludingSelf(ws, tchatConnection);
            }).catch(error => {
                console.log(error);
            })
        }).catch(error => {
            console.log(error);
        })
    }).catch(error => {
        console.log(error);
    })
}

//Delete user from database and broadcast to every client except the disconnected one that a user is now disconnected.
export function disconnectFromTchat(db, ws, content) {
    db.query('DELETE FROM TCHATUSERS WHERE uuid = $1', [content.uuid]).then(() => {
        var tchatInfo = {
            action: "disconnectFromTchat",
            uuid: content.uuid,
        }
        ws.send(JSON.stringify(tchatInfo));
        var tchatDisconnection = {
            action: "updateTchatUser",
            connection: false,
            uuid: content.uuid
        }
        broadcastMessageExcludingSelf(ws, tchatDisconnection);
    }).catch(error => {
        console.log(error);
    })
}