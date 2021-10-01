/* eslint-disable no-unused-vars */
const chalk = require('chalk');
const winston = require('winston');

// Winston logging
const logger = winston.createLogger({
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: 'antiCrashLog.log' }),
	],
	format: winston.format.printf(log => `[${log.level.toLowerCase()}] - ${log.message}`),
});

module.exports = client => {
	process.on('unhandledRejection', (reason, p) => {
		logger.error(chalk.blueBright('[antiCrash.js]') + chalk.red('Unhandled rejection/crash detected.'));
		console.log(reason, p);
	});
	process.on("uncaughtException", (err, origin) => {
		logger.error(chalk.blueBright('[antiCrash.js]') + chalk.red('Uncaught exception/catch detected.'));
		logger.error(err, origin);
	});
	process.on('uncaughtExceptionMonitor', (err, origin) => {
		logger.error(chalk.blueBright('[antiCrash.js]') + chalk.red('Uncaught exception/catch detected. (Monitor)'));
		logger.error(err, origin);
	});
	process.on('multipleResolves', (type, promise, reason) => {
		logger.error(chalk.blueBright('[antiCrash.js]') + chalk.red('Multiple resolves detected.'));
		logger.error(type, promise, reason);
	});
};
