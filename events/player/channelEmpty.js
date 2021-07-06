const { MessageEmbed } = require("discord.js");

module.exports = (client, message, queue) => {
   const channelEmpty = new MessageEmbed()
   .setDescription("Music stopped as there's no one in the voice channel.")
   .setColor("#FF0000")
   return message.channel.send(channelEmpty)
};
