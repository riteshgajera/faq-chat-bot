const restify = require('restify');
require('dotenv').config();
const bot = require('./bot.js');

// Setup Restify Server
const server = restify.createServer();
server.listen(process.env.PORT, () => {
    console.log(`${server.name} listening to ${server.url}`);
});

// Listen for messages from users
server.post('/api/messages', bot.connector('*').listen());
