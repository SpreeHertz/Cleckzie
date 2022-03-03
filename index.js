const { Client, Collection } = require("discord.js");
require('dotenv').config();
const Levels = require('discord-xp');
const chalk = require('chalk');


const client = new Client({
	intents: 32767,
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
	allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
});

module.exports = client;


client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config/config.json");
client.colors = require('./config/colors.json');

require("./handler")(client);

// discord-xp

Levels.setURL(process.env.database).then(console.log(chalk.blueBright('[success] -') + chalk.greenBright(' Database connected for discord-xp.')));
client.on("messageCreate", async (message) => {
	if (!message.guild) return;
	if (message.author.bot) return;

	const randomAmountOfXp = Math.floor(Math.random() * 9) + 1;
	// eslint-disable-next-line no-unused-vars
	const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
});


client.login(process.env.token);
