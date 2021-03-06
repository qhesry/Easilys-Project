export { connectToTchat, disconnectFromTchat, updateUserConnected, updateTchatMessages, switchTabs, displayTchat, closeTchat, sendMessageToTchat };

/*Tchat functions*/
var myUuid;
var myUsername;

/*getter and setter for general variable*/
export function setMyUuid(uuid) {
    myUuid = uuid;
}

export function getmyUuid() {
    return myUuid;
}

export function setMyUsername(username) {
    myUsername = username;
}

export function getMyUsername() {
    return myUsername;
}

//Send a connect message to the server.
function connectToTchat(socket) {
    let nickname = document.getElementById('nickname');
    let message = document.getElementById('validFeedbackUsername');
    if (nickname.value === "") {
        message.setAttribute('style', 'display: block');
    } else {
        let connectToTchatMessage = {
            action: "connectToTchat",
            name: nickname.value
        }
        socket.send(JSON.stringify(connectToTchatMessage));
        message.setAttribute('style', 'display: none');
    }
}

//Send a disconnect message to the server.
function disconnectFromTchat(socket) {
    let disconnectFromTchatMessage = {
        action: "disconnectFromTchat",
        uuid: myUuid
    }
    socket.send(JSON.stringify(disconnectFromTchatMessage));
}

//Display tchat ui.
function displayTchat(content) {
    hideConnectionForm();
    displayDisconnectionForm(content);
    displayTchatContainer();
    displaySendMessageForm();
}

//Hide tchat ui.
function closeTchat() {
    displayConnectionForm();
    hideDisconnectionForm();
    hideTchatContainer();
    hideSendMessageForm();
    clearAllUsers();
    clearAllTchatMessage();
}

/* All functions to hide and display different block of ui for the tchat */
function hideConnectionForm() {
    let connectForm = document.getElementById('connectForm');
    connectForm.setAttribute('style', 'display: none');
}

function hideDisconnectionForm() {
    let disconnectForm = document.getElementById('disconnectForm');
    disconnectForm.setAttribute('style', 'display: none');
}

function hideTchatContainer() {
    let tchatContainer = document.getElementById('tchatContainer');
    tchatContainer.setAttribute('style', 'display: none');
}

function hideSendMessageForm() {
    let messageForm = document.getElementById('messageForm');
    messageForm.setAttribute('style', 'display: none');
}

function displayConnectionForm() {
    let connectForm = document.getElementById('connectForm');
    connectForm.setAttribute('style', 'display: block');
}

function displayDisconnectionForm(content) {
    let disconnectForm = document.getElementById('disconnectForm');
    let greetings = document.getElementById('greetings');
    disconnectForm.setAttribute('style', 'display: block');
    greetings.innerText = "Hello, " + content.name + " !";
}

function displayTchatContainer() {
    let tchatContainer = document.getElementById('tchatContainer');
    tchatContainer.setAttribute('style', 'display: block');
}

function displaySendMessageForm() {
    let messageForm = document.getElementById('messageForm');
    messageForm.setAttribute('style', 'display: block');
}

function switchTabs(tabs) {
    let tchatLink = document.getElementById('tchatLink');
    let usersLink = document.getElementById('usersLink');

    if (tabs === 'tchat') {
        tchatLink.classList.add('active');
        usersLink.classList.remove('active');
        displayTchatTab();
        hideUsersTab();
    } else if (tabs === 'users') {
        usersLink.classList.add('active');
        tchatLink.classList.remove('active');
        displayUsersTab();
        hideTchatTab();
    }
}

function displayTchatTab() {
    let messageContainer = document.getElementById('messageContainer');
    messageContainer.setAttribute('style', 'display: block');
}

function displayUsersTab() {
    let usersContainer = document.getElementById('usersContainer');
    usersContainer.setAttribute('style', 'display: block');
}

function hideTchatTab() {
    let messageContainer = document.getElementById('messageContainer');
    messageContainer.setAttribute('style', 'display: none');
}

function hideUsersTab() {
    let usersContainer = document.getElementById('usersContainer');
    usersContainer.setAttribute('style', 'display: none');
}

//Update users connected in the user tab
function updateUserConnected(content) {
    let usersContainer = document.getElementById('usersContainer');
    let user = userTemplate(content);
    if (undefined !== content.connection && !content.connection) {
        let userToDelete = document.getElementById(content.uuid);
        usersContainer.removeChild(userToDelete);
    } else {
        usersContainer.append(user);
    }
}

//clear the user connected tab from all users
function clearAllUsers() {
    let usersContainer = document.getElementById('usersContainer');
    usersContainer.querySelectorAll('*').forEach(item => item.remove());
}

//Template used to add an user to the UI.
function userTemplate(content) {
    let container = document.createElement('div');
    container.setAttribute('id', content.uuid);
    container.setAttribute('class', 'col m-1');

    let icon = document.createElement('img');
    icon.setAttribute('class', 'col-2');
    icon.setAttribute('src', '../ui/icon/user.svg');

    let username = document.createElement('span');
    username.setAttribute('class', 'col-9 ms-1');
    username.innerText = content.name

    container.append(icon);
    container.append(username);
    return container;
}

//Send a message into the tchat.
function sendMessageToTchat(socket) {
    let message = document.getElementById('message');
    let messageInfo = {
        action: "sendMessageToTchat",
        username: myUsername,
        message: message.value
    }
    socket.send(JSON.stringify(messageInfo));
    message.value = "";
}

//Update tchat message for all user.
function updateTchatMessages(content) {
    let tchatMessagesContainer = document.getElementById('messageContainer');
    let message = messageTemplate(content);

    tchatMessagesContainer.append(message);
    tchatMessagesContainer.scrollTop = tchatMessagesContainer.scrollHeight;
}

//Template used to add a message to the UI.
function messageTemplate(content) {
    let container = document.createElement('div');
    container.setAttribute('class', 'col')
    container.setAttribute('id', content.uuid);

    let time = document.createElement('span');
    time.setAttribute('style', 'font-weight: bold');
    time.innerText = dateStringFromMilliseconds(content.time) + ' - ';

    let username = document.createElement('span');
    username.setAttribute('style', 'font-weight: bold');
    username.innerText = content.username + ' : ';

    let message = document.createElement('span');
    message.innerText = content.message;

    container.append(time);
    container.append(username);
    container.append(message);

    return container;
}

//Clear all tchat messages
function clearAllTchatMessage() {
    let usersContainer = document.getElementById('messageContainer');
    usersContainer.querySelectorAll('*').forEach(item => item.remove());
}

//Utils functions to correctly display a time from miliseconds time.
function dateStringFromMilliseconds(time) {
    let result = "";
    let milisecondsTime = new Date(parseInt(time));
    let hour = milisecondsTime.getHours();
    hour < 10 ? result += '0' + hour : result += hour;
    result += ":";
    let minutes = milisecondsTime.getMinutes();
    minutes < 10 ? result += '0' + minutes : result += minutes;

    return result
}