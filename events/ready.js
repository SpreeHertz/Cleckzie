const client = require('../index');
const chalk = require('chalk');

client.on('ready', () =>
	console.log(chalk.yellow(`${client.user.tag}`) + chalk.green(' is up and ready to go.') + chalk.cyan('\nYou will now be able to use') + chalk.green(' Slash Commands and messages.') + chalk.yellow('\nIf you are') + chalk.red(' not able to use slash commands, try:') + chalk.cyan('\n1) Restart the terminal\n2) Be patient; just wait.')),
);
