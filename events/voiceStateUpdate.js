const client = require('..');
const voiceClient = require('../Client/voiceClient');

client.on('voiceStateUpdate', (oldState, newState) => {
	voiceClient.startListener(oldState, newState);
});