const chalk = require('chalk');

module.exports = (client, error) => {
	console.log(chalk.red(`An error had occured: ${error}`));
};