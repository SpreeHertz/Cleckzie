const chalk = require('chalk');
const botActivity = require('../config.json').bot.activity;
const botStatus = require('../config.json').bot.status;

module.exports = {
	name: "ready",
	once: true,

	/**
	 * @description Executes the block of code when client is ready (bot initialization)
	 * @param {Object} client Main Application Client
	 */
	execute(client) {
		client.user.setPresence({ activities: [{ name: botActivity }], status: botStatus });
		console.log(chalk.cyanBright('success') + chalk.blue(` Ready! Logged in as ${client.user.tag}.`));
	},
};
