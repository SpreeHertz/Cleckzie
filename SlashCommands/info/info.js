/* eslint-disable no-unused-vars */
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
	name: "info",
	description: 'Returns information about Cleckzie',
	/**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
	run: async (interaction, message) => {
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('repository')
					.setLabel('Repository')
					.setStyle('LINK'),
			);

		const embed = new MessageEmbed()
			.setDescription("Cleckzie's links")
			.setTimestamp()
			.setColor('DARK_BUT_NOT_BLACK');

		interaction.followUp({ embeds: [embed], components: [row] });

	},
};