const { Client, Collection } = require("discord.js");
require('dotenv').config();

// Note: 32767 means all intents.
const client = new Client({
	intents: 32767,
});

module.exports = client;

const botActivity = require('./config.json').status;
const botPresence = require('./config.json').presence;

// Presence
client.once('ready', () => {
	client.user.setActivity(botActivity);
	client.user.setPresence(botPresence);
});

client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");

require("./handler")(client);

client.login(process.env.token);
