const client = require('../index');
const chalk = require('chalk');
const winston = require('winston');

const botActivity = require('../config.json').status;
const botPresence = require('../config.json').presence;

// Winston logging
const logger = winston.createLogger({
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: 'readyLog.log' }),
	],
	format: winston.format.printf(log => `[${log.level.toLowerCase()}] - ${log.message}`),
});


client.once('ready', () => {
	client.user.setActivity(botActivity);
	client.user.setPresence(botPresence);
	logger.info(chalk.blueBright(`${client.user.tag} is up and ready to go!`));
	logger.info(chalk.blueBright(`You should be able to use slash commands and normal commands properly.`));
	logger.info(chalk.yellow('Restart the terminal and/or wait to register the slash commands.'));
});

client.on('error', () => {
	console.log(chalk.blueBright('<ready.js>')(' Oh no! An error had occuerd. Please file an issue on https://github.com/SpreeHertz/Cleckzie if you think that it is an error with our code.'));
});