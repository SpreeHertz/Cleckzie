module.exports = {
	name: 'play',
	description: 'Play a song to your voice channel',
	options: [{
		name: 'song',
		type: 'STRING',
		description: 'Specify a link/song',
		required: true,
	}],
	run: async (client, interaction) => {
		const songArgs = interaction.options.getString('song');
		const voiceChannel = interaction.member.voice.channel;
		if (!voiceChannel) return interaction.followUp({ content: 'Please join a voice channel first.' });

		const res = await client.manager.search(
			songArgs.slice(6),
			interaction.user.username,
		);

		const player = client.manager.create({
			guild: interaction.guild.id,
			voiceChannel: interaction.member.voice.channel.id,
			textChannel: interaction.channel.id,
		});

		player.connect();

		player.queue.add(res.tracks[0]);

		if (!player.playing && !player.paused && !player.queue.size) {
			player.play();
		}

		if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length) {
			player.play();
		}

	},
};