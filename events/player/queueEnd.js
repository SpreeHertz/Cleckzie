const { MessageEmbed } = require("discord.js");

module.exports = (client, message, queue) => {
    const queueEnd = new MessageEmbed()
        .setDescription(`${emojis.queue} I left the voice channel since there is no more music in the queue.`)
        .setclient.config.color(client.config.color.boom)
    message.channel.send(queueEnd);
};