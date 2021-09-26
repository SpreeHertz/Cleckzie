const { VoiceClient } = require('djs-voice');
const client = require('../index');

// Make the debug boolean to false if you don't want console logging.

const voiceClient = new VoiceClient({
	allowBots: false,
	client: client,
	debug: true,
	mongooseConnectionString: process.env.database,
});

module.exports = voiceClient;