/* eslint-disable no-unused-vars */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {

	...new SlashCommandBuilder()
		.setName("say")
		.setDescription("The bot repeats what you say")
		.addStringOption((option) =>
			option
				.setName("message")
				.setDescription("What the bot is gonna say")
				.setRequired(true),
		),

	/**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
	run: async (client, interaction, args) => {
		const echo = interaction.options.getString('message');
		const embed = new MessageEmbed()
			.setAuthor(interaction.user.username, interaction.user.displayAvatarURL({ dynamic: true }))
			.setDescription(echo)
			.setColor('RANDOM')
			.setTimestamp();
		interaction.followUp({ embeds: [embed] });
	},

};
