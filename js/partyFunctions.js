export { createParty, removePartyFromDocument, addPartyToDocument, switchPartyState };

function createParty(socket) {
    let partyName = document.getElementById('partyName');
    let validFeedbackPartyName = document.getElementById('validFeedbackPartyName');
    if (partyName.value === "") {
        validFeedbackPartyName.setAttribute('style', 'display: block');
    } else {
        let createPartyMessage = {
            action: "createParty",
            name: partyName.value
        }
        socket.send(JSON.stringify(createPartyMessage));
        validFeedbackPartyName.setAttribute('style', 'display: none');
    }
}

function partyTemplate(socket, content) {
    let container = document.createElement('div');
    container.setAttribute('class', 'row form-check');
    container.setAttribute('id', content.uuid);

    let checkbox = document.createElement('input');
    checkbox.setAttribute('class', 'col-1');
    checkbox.setAttribute('id', 'checkbox' + content.uuid);
    checkbox.setAttribute('type', 'checkbox');
    checkbox.addEventListener('click', () => {
        let switchPartyStateMessage = {
            action: "switchPartyState",
            uuid: content.uuid,
            terminated: checkbox.checked
        };
        socket.send(JSON.stringify(switchPartyStateMessage));
    });

    let name = document.createElement('label');
    name.setAttribute('class', 'col-9');
    name.setAttribute('for', 'checkbox' + content.uuid);
    name.innerText = content.name;

    let removeButton = document.createElement('button');
    removeButton.setAttribute('type', 'button');
    removeButton.setAttribute('class', 'btn btn-primary col-2');
    removeButton.innerText = "Remove";
    removeButton.addEventListener('click', () => {
        let removePartyMessage = {
            action: "removeParty",
            uuid: content.uuid
        }
        socket.send(JSON.stringify(removePartyMessage));
    });

    let hr = document.createElement('hr');
    container.append(checkbox);
    container.append(name);
    container.append(removeButton);
    container.append(hr);
    return container;
}

function removePartyFromDocument(content) {
    let partyRemoved = document.getElementById(content.uuid);
    let partyDisplay = document.getElementById('partyDisplay');
    partyDisplay.removeChild(partyRemoved);
    if (!partyRemoved.childNodes[0].checked) {
        updateOnGoingCount();
    }
}

function addPartyToDocument(socket, content) {
    let partyDisplay = document.getElementById('partyDisplay');
    let partyName = document.getElementById('partyName');

    let party = partyTemplate(socket, content);
    partyDisplay.append(party);
    switchPartyState(content);

    partyName.value = '';
}

function updateOnGoingCount() {
    let countOnGoingParty = document.getElementById('countOnGoingParty');
    let count = document.getElementById('partyDisplay').querySelectorAll("input[type='checkbox']:not(:checked)").length;
    countOnGoingParty.innerText = count;
}

function switchPartyState(content) {
    let childs = document.getElementById(content.uuid).childNodes;
    if (content.terminated) {
        childs[0].setAttribute('checked', true);
        childs[1].setAttribute('style', 'color: red');
        updateOnGoingCount();
    } else {
        childs[0].removeAttribute('checked');
        childs[1].setAttribute('style', 'color: green');
        updateOnGoingCount();
    }
}