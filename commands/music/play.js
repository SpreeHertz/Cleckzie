const { MessageEmbed } = require('discord.js');

module.exports = {
	name: "play",
	aliases: ['p'],
	/**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
	run: async (client, message) => {
		const voiceChannel = message.member.voice.channel;
		if (!voiceChannel) {
			const notInVoice = new MessageEmbed()
				.setDescription(`Please join a voice channel first.`)
				.setColor(client.colors.confused);
			message.channel.send({ embeds: [notInVoice] });
		}

		const res = await client.manager.search(
			message.content.slice(6),
			message.author,
		);
		if (!res) {
			return message.channel.send('You need to specify a song link/name for me to play it.');
		}

		const player = client.manager.create({
			guild: message.guild.id,
			voiceChannel: message.member.voice.channel.id,
			textChannel: message.channel.id,
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
