const { MessageEmbed } = require('discord.js');


module.exports = (client, message, query) => {
	const noResults = new MessageEmbed()
		.setDescription(`No results found for ${query}.`)
		.setColor(client.colors.error);
	message.channel.send(noResults);
};