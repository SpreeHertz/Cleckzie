const { MessageEmbed } = require("discord.js");

module.exports = (client, message, queue, track) => {
   const trackAdd = new MessageEmbed()
      .setDescription(`${client.config.emojis.success} ${track.title} has been added to the queue.`)
      .setColor(client.config.color.success)
   message.channel.send(trackAdd)
};