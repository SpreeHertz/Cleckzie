const { MessageEmbed } = require("discord.js");

module.exports = (client, message, interaction) => {
	const botDisconnect = new MessageEmbed()
		.setDescription("Music stopped as I have been disconnected from the channel.")
		.setColor("#FF0000");
	message.channel.send({ embeds: [botDisconnect] });
	if (interaction) interaction.followUp({ embeds: [botDisconnect] });
};