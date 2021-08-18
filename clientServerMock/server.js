const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
    console.log(path.join(__dirname, '../ui/index.html'));
    fs.readFile(path.join(__dirname, '../ui/index.html'), 'utf8', (err, text) => {
        res.send(text);
    });
});

app.get('/css/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, '../css/style.css'));
});

app.get('/js/main.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../js/main.js'));
});

app.get('/js/partyFunctions.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../js/partyFunctions.js'));
});

app.get('/js/tchatFunctions.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../js/tchatFunctions.js'));
});

app.get('/js/socketFunctions.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../js/socketFunctions.js'));
});

app.get('/ui/icon/user.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../ui/icon/user.svg'));
})

app.listen(port, () => {
  console.log(`clientServerMock listen at http://localhost:${port}`)
});