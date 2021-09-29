/* eslint-disable no-unused-vars */
const { MessageEmbed, CommandInteraction } = require('discord.js');
const voiceClient = require('../../Client/voiceClient');
const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {

	...new SlashCommandBuilder()
		.setName("voice-leaderboard")
		.setDescription("Shows the top users in the voice leaderboard")
		.addNumberOption((option) =>
			option
				.setName("top")
				.setDescription("The amount of top users to show")
				.setRequired(true),
		),


	/**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
	run: async (client, interaction, args, message) => {
		const Guild = interaction.guild;
		const fetchNumber = interaction.options.getNumber('top');
		if (fetchNumber > 30) return interaction.channel.send({ content: `The bot cannot fetch more than 50 users' leaderboard. Please try a lower number.`, ephemeral: true });
		const embed = await voiceClient.generateLeaderboard({
			message: message,
			top: fetchNumber,
			guild: Guild,
			color: 'RANDOM',
		});

		interaction.followUp({ embeds: [embed] });
	},

};
// git test