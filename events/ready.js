const client = require('../index');
const chalk = require('chalk');

client.on('ready', () =>
	console.log(chalk.yellow(`${client.user.tag}`) + chalk.green(' is up and ready to go.') +
    chalk.cyan('\nYou should be able to use slash commands and normal commands properly.') +
    chalk.cyan('\nIf you are') +
    chalk.red(' not able to see Slash Commands (/) or normal commands properly, try:') +
    chalk.red('\n1) Restarting the terminal\n2)Be patient; just wait.')),

);
