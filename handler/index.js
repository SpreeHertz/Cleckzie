/* eslint-disable no-unused-vars */
const { glob } = require('glob');
const { promisify } = require('util');
const { Client } = require('discord.js');
const mongoose = require('mongoose');
const chalk = require('chalk');
const guildId = require('../config/config.json');
const winston = require('winston');
const globPromise = promisify(glob);


const logger = winston.createLogger({
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: 'errorDebug.log' }),
	],
	format: winston.format.printf(log => `[${log.level.toLowerCase()}] - ${log.message}`),
});


/**
 * @param {Client} client
 */
module.exports = async (client) => {
	// Commands
	const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
	commandFiles.map((value) => {
		const file = require(value);
		const splitted = value.split('/');
		const directory = splitted[splitted.length - 2];

		if (file.name) {
			const properties = { directory, ...file };
			client.commands.set(file.name, properties);
		}
	});

	// Events
	const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
	eventFiles.map((value) => require(value));

	// Slash Commands
	const slashCommands = await globPromise(
		`${process.cwd()}/SlashCommands/*/*.js`,
	);

	const arrayOfSlashCommands = [];
	slashCommands.map((value) => {
		const file = require(value);
		if (!file?.name) return;
		client.slashCommands.set(file.name, file);

		if (['MESSAGE', 'USER'].includes(file.type)) delete file.description;
		arrayOfSlashCommands.push(file);
	});
	client.on('ready', async () => {
		const guild = await client.application.commands.set(arrayOfSlashCommands);
		// Register for all the guilds the bot is in
		// const guild = await client.application.commands.set(arrayOfSlashCommands);
		// If you wish to un-register your slash commands change the 49th line to: const guild = await client.application.commands.set([]);
		// await client.application.commands.set(arrayOfSlashCommands); to apply slash commands globally.
	});


};

// MongoDB
if (!process.env.database) {
	console.log(chalk.red('Looks like you have not specified your MongoDB Connection string in your .env file yet. Commands (including slash commands) will not work if you don\'t specify it.'));
}

try {
	mongoose.connect(process.env.database, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	}).then(console.log(chalk.grey('[info] - ') + chalk.cyan('Connected to') + chalk.green(' MongoDB successfully.')));

}
catch (error) {
	logger.error(chalk.redBright(`MongoDB connection failed.\nError ${error}`));
}