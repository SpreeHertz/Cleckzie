const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "ping",
	description: "Returns websocket ping",
	/**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
	run: async (client, interaction) => {
		// Circles
		const circles = {
			green: "🟢",
			yellow: "🟡",
			red: "🔴",
		};

		const embed = new MessageEmbed()
			.setColor('BLURPLE')
			.setAuthor(interaction.user.username, interaction.user.displayAvatarURL({ dynamic: true }))
			.addField("Websocket", `${client.ws.ping <= 200 ? circles.green : client.ws.ping <= 400 ? circles.yellow : circles.red} ${client.ws.ping}ms`);
		interaction.followUp({ embeds: [embed] });
	},
};