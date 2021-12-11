const chalk = require('chalk');

module.exports = {
	name: "ready",
	once: true,

	/**
	 * @description Executes the block of code when client is ready (bot initialization)
	 * @param {Object} client Main Application Client
	 */
	execute(client) {
		console.log(chalk.cyanBright('success') + chalk.blue(` Ready! Logged in as ${client.user.tag}.`));
	},
};
