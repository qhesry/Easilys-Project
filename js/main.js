import * as PartyFunctions from './partyFunctions.js';
import * as TchatFunctions from './tchatFunctions.js';
import * as SocketFunctions from './socketFunctions.js';

//Initilize webSocket connection and webSocket response.
SocketFunctions.openConnectionSocket();
SocketFunctions.initializeOnMessageSocket();
addAllEventListener();

//Add all the events necessary to use the buttons of the application.
function addAllEventListener() {
    let createPartyButton = document.getElementById('createPartyButton');
    let connectToTchatButton = document.getElementById('connectToTchatButton');
    let disconnectFromTchatButton = document.getElementById('disconnectFromTchatButton');
    let tchatLink = document.getElementById('tchatLink');
    let usersLink = document.getElementById('usersLink');
    let sendMessageToTchatButton = document.getElementById('sendMessageToTchatButton');

    createPartyButton.addEventListener('click', () => { PartyFunctions.createParty(SocketFunctions.socket) });
    connectToTchatButton.addEventListener('click', () => { TchatFunctions.connectToTchat(SocketFunctions.socket) });
    disconnectFromTchatButton.addEventListener('click', () => { TchatFunctions.disconnectFromTchat(SocketFunctions.socket) });
    tchatLink.addEventListener('click', () => { TchatFunctions.switchTabs('tchat') });
    usersLink.addEventListener('click', () => { TchatFunctions.switchTabs('users') });
    sendMessageToTchatButton.addEventListener('click', () => { TchatFunctions.sendMessageToTchat(SocketFunctions.socket) });
}
