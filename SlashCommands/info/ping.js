/* eslint-disable no-unused-vars */
const { Client, CommandInteraction, MessageEmbed, User, Message } = require("discord.js");

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
	run: async (client, interaction, args, message) => {
		if (message) {
			const pingEmbed = new MessageEmbed()
				.setColor('RANDOM')
				.addField('Websocket', `${client.ws.ping}`)
				.setTimestamp()
				.setAuthor(User.name, User.displayAvatarURL({ dynamic: true }));
			interaction.followUp({ embeds: [pingEmbed] });
		}

	},
};
