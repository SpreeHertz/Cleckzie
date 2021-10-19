const MessageEmbed = require('discord.js');

module.exports = {
	name: "pause",
	description: "Pauses the player",
	run: async (client, message) => {
		const player = client.manager.create({
			guild: message.guild.id,
			voiceChannel: message.member.voice.channel.id,
			textChannel: message.channel.id,
		});

		if (player.playing) {
			player.pause(true);
			const pauseEmbed = new MessageEmbed()
				.setDescription(`⏸ Paused the player.`)
				.setColor('GREEN');
			message.channel.send({ embeds: [pauseEmbed] });
		}
		else {
			const nothingToPause = new MessageEmbed()
				.setDescription(`There's nothing music playing for me to pause.`)
				.setColor(client.colors.confused);
			message.channel.send({ embeds: [nothingToPause] });
		}
	},

};
