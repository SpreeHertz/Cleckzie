const { MessageEmbed } = require('discord.js');
const { color, emojis, footer } = require('../config/bot')

module.exports = (client, message, query) => {
    const noResults = new MessageEmbed()
    .setDescription(`${emojis.error} No results found for ${query}.`)
    .setColor(color.error)
    message.channel.send(noResults)
};