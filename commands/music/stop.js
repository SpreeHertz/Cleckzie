const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "stop",
	aliases: ['leave', 'disconnect', 'dc', 'fuckoff'],
	description: "Stops the song from playing and disconnects.",
	run: async (client, message) => {
		const player = client.manager.create({
			guild: message.guild.id,
			voiceChannel: message.member.voice.channel.id,
			textChannel: message.channel.id,
		});

		if (player.playing) {
			player.stop();
			const stopEmbed = new MessageEmbed()
				.setDescription(`Destroyed the player and disconnected from your voice channel!`)
				.setColor('DARK_BUT_NOT_BLACK')
				.setTimestamp();
			message.channel.send({ embeds: [stopEmbed] });
		}
		else {
			const nothingToStop = new MessageEmbed()
				.setDescription(`I'm not playing anything for me to stop.`)
				.setColor('RED')
				.setTimestamp();
			message.channel.send({ embeds: [nothingToStop] });
		}
	},
};
