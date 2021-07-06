const { MessageEmbed } = require('discord.js');

module.exports = (client, message, query) => {
    const noResults = new MessageEmbed()
        .setDescription(`${client.config.emojis.error} No results found for ${query}.`)
        .setColor(client.config.color.error)
    message.channel.send(noResults)
};