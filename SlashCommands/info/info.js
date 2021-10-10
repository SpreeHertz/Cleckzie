/* eslint-disable no-unused-vars */
const { MessageActionRow, MessageButton, MessageEmbed, CommandInteraction } = require('discord.js');

module.exports = {
	name: "info",
	description: 'Returns information about Cleckzie',
	/**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
	run: async (args, interaction) => {
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setLabel('Repository')
					.setStyle('LINK')
					.setURL('https://github.com/spreehertz/cleckzie'),
			);

		const embed = new MessageEmbed()
			.setDescription("Cleckzie's links")
			.setTimestamp()
			.setColor('RANDOM');

		interaction.followUp({ embeds: [embed], components: [row] });

	},
};