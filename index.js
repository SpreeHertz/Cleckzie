const { Client, Collection } = require("discord.js");
require('dotenv').config();
const chalk = require('chalk');

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

// discord-xp
const Levels = require("discord-xp");

Levels.setURL(process.env.database).then(console.log(chalk.grey('[info] -' + chalk.blueBright(' Database successfully connected for messages leveling. (discord-xp)'))));
client.on("messageCreate", async (message) => {
	if (!message.guild) return;
	if (message.author.bot) return;

	const randomAmountOfXp = Math.floor(Math.random() * 9) + 1;
	const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
	if (hasLeveledUp) {
		const user = await Levels.fetch(message.author.id, message.guild.id);
		message.channel.send({ content: `Congratulations ${message.author.username}, your level is now ${user.level}. :tada:` })
			.then(m => {
				setTimeout(() => {
					m.delete();
				},
				10000);
			});

	}
});


client.login(process.env.token);
