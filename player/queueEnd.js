const { MessageEmbed } = require("discord.js");
const { color, emojis, footer, discord } = require('../config/bot')

module.exports = (client, message, queue) => {
    const queueEnd = new MessageEmbed()
    .setDescription(`${emojis.queue} I left the voice channel since there is no more music in the queue.`)
    .setColor(color.boom)
    message.channel.send(queueEnd);
};