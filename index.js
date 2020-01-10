const express = require('express');
const bodyParser = require('body-parser');
const app = express().use(bodyParser.json());
const PORT = 3000;
const fs = require('fs');
const generator = require('generate-password');
const auth = require('basic-auth');
const shelljs = require("shelljs");
shelljs.config.silent = true;

const authPath = __dirname + '/data/auth.json';
const commandPath = __dirname + '/data/commands';
let authInfo = { username: '', password: '' };

if (!fs.existsSync(authPath)) fs.writeFileSync(authPath, JSON.stringify({ username: '', password: '' }));
if (!fs.existsSync(commandPath)) fs.writeFileSync(commandPath, '');

const contents = fs.readFileSync(authPath, 'utf8');
try {
    authInfo = JSON.parse(contents);
} catch (error) {
}
if (!authInfo.username || !authInfo.password) {
    authInfo.username = generator.generate({
        length: 8,
        numbers: true
    });
    authInfo.password = generator.generate({
        length: 10,
        numbers: true
    });
    fs.writeFileSync(authPath, JSON.stringify(authInfo));
}

app.post('/', (req, res) => {
    const credentials = auth(req)
    if (credentials.name === authInfo.username && credentials.pass === authInfo.password) {
        const commands = fs.readFileSync(commandPath, 'utf8').split("\n");
        for (const command of commands) {
            shelljs.exec(command);
        }
        res.sendStatus(200);
    } else res.sendStatus(401);
});

app.listen(PORT, () => console.log('Webhook is listening. Please use this auth infomation: \n' + JSON.stringify(authInfo)));