/* eslint-disable no-unused-vars */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {

	...new SlashCommandBuilder()
		.setName("achievement")
		.setDescription("Turns your text into a minecraft achievement")
		.addStringOption((option) =>
			option
				.setName("message")
				.setDescription("Text to make it an achievement")
				.setRequired(true),
		),

	/**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
	run: async (client, interaction, args) => {
		const textToConvert = interaction.options.getString('message');
		if (textToConvert > 22) return interaction.channel.send({ content: 'The text should be less than 22 characters.', ephemeral: true });
		const embed = new MessageEmbed()
			.setTitle('Achievement unlocked!')
			.setAuthor(interaction.user.username, interaction.user.displayAvatarURL({ dynamic: true }))
			.setImage(`https://api.cool-img-api.ml/achievement?text=${textToConvert}`)
			.setColor('RANDOM')
			.setTimestamp();
		interaction.followUp({ embeds: [embed] });
	},

};