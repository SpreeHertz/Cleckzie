const client = require('../index');
const chalk = require('chalk');

const botActivity = require('../config/config.json').bot.activity;
const botStatus = require('../config/config.json').bot.status;

client.once('ready', () => {
	client.user.setPresence({ activities: [{ name: botActivity }], status: botStatus });
	console.log(chalk.grey('[info] -') + chalk.blueBright(` ${client.user.tag} is online.`));
	console.log(chalk.grey('[info] -') + chalk.blueBright(` You should be able to use slash commands and normal commands properly.`));
	console.log(chalk.grey('[info] -') + chalk.yellow(' Restart the terminal and/or wait to register the slash commands.'));
});
