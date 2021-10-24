const { Client, Collection } = require("discord.js");
const Levels = require("discord-xp");
const chalk = require("chalk");
require('dotenv').config();
const winston = require('winston');

// Note: 32767 means all intents.
const client = new Client({
	intents: 32767,
	allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

module.exports = client;

// discord-xp
try {
	Levels.setURL(process.env.database).then(console.log(chalk.grey('[info] -' + chalk.cyanBright(' Database successfully connected') + chalk.magentaBright(' for messages leveling.') + chalk.yellow(' (discord-xp)'))));
}
catch (error) {
	console.log(chalk.red(`[error] - Something wrong happened while trying to connect to database for the discord-xp package.\nError: ${error}`));
}

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


client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config/config.json");
client.colors = require('./config/colors.json');

// antiCrash
// Winston logging
const logger = winston.createLogger({
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: 'antiCrash-log.log' }),
	],
	format: winston.format.printf(log => `[${log.level.toLowerCase()}] - ${log.message}`),
});

module.exports = () => {
	process.on('unhandledRejection', (reason, p) => {
		logger.error(chalk.red('Unhandled rejection/crash detected.'));
		console.log(reason, p);
	});
	process.on("uncaughtException", (err, origin) => {
		logger.error(chalk.red('Uncaught exception/catch detected.'));
		logger.error(err, origin);
	});
	process.on('uncaughtExceptionMonitor', (err, origin) => {
		logger.error(chalk.red('Uncaught exception/catch detected. (Monitor)'));
		logger.error(err, origin);
	});
	process.on('multipleResolves', (type, promise, reason) => {
		logger.error(chalk.red('Multiple resolves detected.'));
		logger.error(type, promise, reason);
	});
};


client.login(process.env.token);
