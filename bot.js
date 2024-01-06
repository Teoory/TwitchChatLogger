

const tmi = require('tmi.js');
const fs = require('fs');
const path = require('path');

const messagesFolderPath = path.join(__dirname, 'messages');

if (!fs.existsSync(messagesFolderPath)) {
    fs.mkdirSync(messagesFolderPath, { recursive: true });
}

const client = new tmi.Client({
    options: { debug: true },
    connection: {
        secure: true,
        reconnect: true
    },
    identity: {
        username: 'Username',
        password: 'oauth:TOKEN'
    },
    channels: ['Channel']
});

client.on('message', (channel, tags, message, self) => {
    if (self) return;

    const username = tags.username;

    const userMessagesPath = path.join(messagesFolderPath, `${username}.json`);
    let userMessages = [];

    if (fs.existsSync(userMessagesPath)) {
        const fileData = fs.readFileSync(userMessagesPath, 'utf8');
        userMessages = JSON.parse(fileData);
    }

    const now = new Date();
    const formattedTimestamp = `${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getFullYear()} / ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;


    userMessages.push({
        timestamp: formattedTimestamp,
        message: message
    });

    fs.writeFileSync(userMessagesPath, JSON.stringify(userMessages, null, 2));
});

client.connect().catch(console.error);
