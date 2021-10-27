const chalk = require('chalk');
const logger = require('../logs/anti-crash-log.json');

module.exports = () => {
	process.on('unhandledRejection', (reason, p) => {
		logger.log(chalk.blueBright('[antiCrash.js]') + chalk.red('Unhandled rejection/crash detected.'));
		logger.log(reason, p);
	});
	process.on("uncaughtException", (err, origin) => {
		logger.log(chalk.blueBright('[antiCrash.js]') + chalk.red('Uncaught exception/catch detected.'));
		logger.log(err, origin);
	});
	process.on('uncaughtExceptionMonitor', (err, origin) => {
		logger.log(chalk.blueBright('[antiCrash.js]') + chalk.red('Uncaught exception/catch detected. (Monitor)'));
		logger.log(err, origin);
	});
	process.on('multipleResolves', (type, promise, reason) => {
		logger.log(chalk.blueBright('[antiCrash.js]') + chalk.red('Multiple resolves detected.'));
		logger.log(type, promise, reason);
	});
};