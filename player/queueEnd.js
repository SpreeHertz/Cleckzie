const { MessageEmbed } = require("discord.js");


module.exports = (client, message, queue) => {
	const queueEnd = new MessageEmbed()
		.setDescription(`I left the voice channel since there is no more music in the queue.`)
		.setColor(client.colors.red);
	message.channel.send(queueEnd);
};