const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "ping",
	/**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
	run: async (client, message) => {
		// roleColor
		const roleColor =
          message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor;
		// Circles
		const circles = {
			green: "🟢",
			yellow: "🟡",
			red: "🔴",
		};

		const embed = new MessageEmbed()
			.setColor(roleColor)
			.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
			.addField("Websocket",
				`${client.ws.ping <= 200 ? circles.green : client.ws.ping <= 400 ? circles.yellow : circles.red} ${client.ws.ping}ms`,
			);
		message.channel.send({ embeds: [embed] });
	},
};
