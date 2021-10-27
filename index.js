const { Client, Collection } = require("discord.js");
require('dotenv').config();
const Levels = require('discord-xp');
const chalk = require('chalk');

// Note: 32767 means all intents.
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

Levels.setURL(process.env.database).then(console.log(chalk.grey('[info] -') + chalk.cyanBright(' Database connected for discord-xp.')));
client.on("messageCreate", async (message) => {
	if (!message.guild) return;
	if (message.author.bot) return;

	const randomAmountOfXp = Math.floor(Math.random() * 9) + 1;
	// eslint-disable-next-line no-unused-vars
	const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
});

// preventScams

client.on('messageCreate', async message => {
	const array = require(`./json/scam.json`);
	if (array.includes(message.content)) {
		message.delete();
		try {

			client.guilds.cache.get(message.guild.id).members.cache.get(message.author.id).kick({ days: 7, reason: `Steam Scam Link\n(${message.content})` });
		}
		catch (error) {
			console.log(chalk.red(error));
		}
		message.channel.send({ content: `**${message.author}** was *kicked* because their account was token-grabbed due to a Steam scam link.` });
	}
});
client.login(process.env.token);
