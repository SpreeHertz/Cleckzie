/* eslint-disable no-unused-vars */
const { Client, CommandInteraction, MessageEmbed, User, Message } = require("discord.js");
const chalk = require('chalk');

module.exports = {
	name: "ping",
	description: "Returns websocket ping",
	type: 'CHAT_INPUT',
	/**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
	run: async (client, interaction) => {
		const pingEmbed = new MessageEmbed()
			.setColor('RANDOM')
			.addField('Websocket', `${client.ws.ping}`)
			.setTimestamp()
			.setAuthor(User.name, interaction.user.displayAvatarURL({ dynamic: true }));
		interaction.reply({ embeds: [pingEmbed] }).then(console.log(chalk.cyan(` ${interaction.user.username}`) + chalk.green(' executed') + chalk.cyan(' SlashCommands/ping.js') + chalk.green(' in the channel') + chalk.cyan(` #${interaction.channel.name}`) + chalk.green(' on the guild') + chalk.cyan(` ${interaction.guild}.`)));


	},
};
