const { MessageEmbed } = require("discord.js");
const { color, emojis, footer, discord } = require('../config/bot')
  
module.exports = (client, message, queue, track) => {
   const trackAdd = new MessageEmbed()
   .setDescription(`${emojis.success} ${track.title} has been added to the queue.`)
   .setColor(color.success)
   message.channel.send(trackAdd)
};