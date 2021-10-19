const { MessageEmbed } = require("discord.js");
  
module.exports = (client, message, queue, track) => {
   const trackAdd = new MessageEmbed()
   .setDescription(`${emojis.success} ${track.title} has been added to the queue.`)
   .setColor(client.color.success)
   message.channel.send(trackAdd)
};