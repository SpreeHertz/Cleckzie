const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	...new SlashCommandBuilder()
		.setName("userinfo")
		.setDescription("Returns useful information about a user")
		.addUserOption((option) =>
			option
				.setName('target')
				.setDescription("Whom to return user information about")
				.setRequired(true),
		),
	/**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
	run: async (client, interaction) => {
		const user = interaction.options.getMember('target');

		const embed = new MessageEmbed()
			.addField('Using Discord on', `${user.GuildMember.clientStatus}`)
			.addField('Username', `${user.username}`);

		interaction.followUp({ embeds: [embed] });
	},
};