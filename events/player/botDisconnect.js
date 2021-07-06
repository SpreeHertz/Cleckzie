const { MessageEmbed } = require("discord.js");

module.exports = (client, message, queue) => {
   const botDc_ = new MessageEmbed()
   .setDescription("Music stopped as I have been disconnected from the channel.")
   .setColor("#FF0000")
   message.channel.send(botDc_)
};