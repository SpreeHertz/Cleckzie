const chalk = require('chalk');
const client = require('..');
const voiceClient = require('../Client/voiceClient');

client.on('voiceStateUpdate', (oldState, newState) => {
	voiceClient.startListener(oldState, newState).then(
		console.log('[info] -' + chalk.cyanBright(' Started listening for voiceStateUpdate. (djs-voice)')),
	);
});