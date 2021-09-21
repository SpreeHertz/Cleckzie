/* eslint-disable no-unused-vars */
const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
	name: "ping",
	aliases: ['p'],
	/**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
	run: async (client, message, args) => {
		const embed = new MessageEmbed()
			.addField('Websocket', `${client.ws.ping}ms`);
		message.channel.send({ embeds: [embed] });
	},
};
