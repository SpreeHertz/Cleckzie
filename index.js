const { Client, Collection } = require("discord.js");
require('dotenv').config();

// Note: 32767 means all intents.
const client = new Client({
	intents: 32767,
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

module.exports = client;


client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config/config.json");
client.colors = require('./config/colors.json');


client.login(process.env.token);
