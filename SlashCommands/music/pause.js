const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'pause',
	description: 'Pause a song',
	run: async (client, interaction) => {
		const player = client.manager.create({
			guild: interaction.guild.id,
			voiceChannel: interaction.member.voice.channel.id,
			textChannel: interaction.channel.id,
		});

		if (player.playing) {
			const pauseEmbed = new MessageEmbed()
				.setDescription('Succesfully paused the player.')
				.setColor('GREEN')
				.setTimestamp();
			player.pause(true);
			interaction.followUp({ embeds: [pauseEmbed] });
		}
		else {
			interaction.followUp(`There's no song playing for me to pause.`);
		}


	},
};