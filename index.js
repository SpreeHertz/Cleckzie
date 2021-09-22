const { Client, Collection } = require("discord.js");
require('dotenv').config();

const client = new Client({
	intents: 32767,
});
module.exports = client;


client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");

require("./handler")(client);

client.login(process.env.token);