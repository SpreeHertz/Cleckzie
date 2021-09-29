const { Client, Collection } = require("discord.js");
require('dotenv').config();

// Note: 32767 means all intents.
const client = new Client({
	intents: 32767,
});

module.exports = client;


client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");

const botActivity = require('./config.json').status;
const botPresence = require('./config.json').presence;

require("./handler")(client);


// Presence & activity
client.once('ready', () => {
	client.user.setActivity(botActivity);
	client.user.setPresence(botPresence);
});


client.login(process.env.token);
