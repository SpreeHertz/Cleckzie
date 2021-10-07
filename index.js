const { Client, Collection } = require("discord.js");
require('dotenv').config();

// Note: 32767 means all intents.
const client = new Client({
	intents: 32767,
	disableMentions: 'everyone',
});

module.exports = client;


client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config/config.json");

require("./handler")(client);

client.login(process.env.token);
