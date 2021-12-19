const { VoiceClient } = require('djs-voice');
const client = require('../index');

// allowBots: If true, it will also allow bots to be shown on the rank and leaderboard.
// debug: If true, it will show whoever leaves/joins a voice channel with the time spent.
const voiceClient = new VoiceClient({
	allowBots: false,
	client: client,
	debug: true,
	mongooseConnectionString: process.env.database,
});

module.exports = voiceClient;