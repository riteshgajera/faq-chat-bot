const builder = require('botbuilder')

// chat connector for communicating with the Bot Framework Service
const connector = new builder.ChatConnector	({
	appId: process.env.MICROSOFT_APP_ID,
	appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Default dialog to use QnA Maker
const bot = new builder.UniversalBot(connector, require('./faq.js'));
module.exports = bot;