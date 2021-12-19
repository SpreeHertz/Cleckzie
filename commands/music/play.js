const { MessageEmbed } = require('discord.js');
const { QueryType } = require('discord-player');
const chalk = require('chalk');
const player = require('../../Client/player');

module.exports = {
	name: "play",
	description: "play a song",
	run: async (client, message, args) => {
		// Embeds
		// No voice channel embed
		const noVoice = new MessageEmbed()
			.setDescription(`Please join a voice channel first!`)
			.setColor(client.colors.error);
		// No results embed
		const noResults = new MessageEmbed()
			.setDescription(`I couldn't find anything related to your song. Please make sure that you have not made a spelling error, and try specifying the artist.`)
			.setColor(client.colors.error);
		// Could not join embed
		const errorWhileJoining = new MessageEmbed()
			.setDescription(`Sorry, I wasn't able to join your voice channel!`)
			.setColor(client.colors.error);
		// Defining main stuff
		const query = args.join(" ");
		const guild = client.guilds.cache.get(message.guild.id);
		const channel = client.channels.cache.get(message.channel.id);
		const searchResult = await player.search(query, {
			requestedBy: message.member,
			searchEngine: QueryType.AUTO,
		}).catch((error) => {
			console.log(chalk.red(`An error had occured in play.js\nError: ${error}`));
		});

		// Create queue
		const queue = player.createQueue(guild, {
			metadata: channel,
		});
		// If not in a voice channel
		if (!message.member.voice.channel) return message.channel.send({ embeds: [noVoice] });
		// If no search results were found
		if (!searchResult || !searchResult.tracks.length) return void message.channel.send({ embeds: [noResults] });

		// Fetch the member
		const member = guild.members.cache.get(message.member.id) ?? guild.members.fetch(message.member.id);
		try {
			if (!queue.connection) await queue.connect(member.voice.channel);
		}
		catch {
			// If bot can't join
			void player.deleteQueue(message.guild.id);
			return void message.channel.send({ embeds: [errorWhileJoining] });
		}
		// Send after there's no errors
		// nowPlaying Embed
		const loadingTrack = new MessageEmbed()
			.setDescription(`**Loading your ${searchResult.playlist ? 'playlist' : 'track'}**`)
			.setColor(client.colors.success);
		await message.channel.send({ embeds: [loadingTrack] });
		searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0]);
		if (!queue.playing) await queue.play();

	},
};