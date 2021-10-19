const { MessageEmbed } = require("discord.js");

module.exports = (client, message, queue, playlist) => {
    const playlistAdd = new MessageEmbed()
    .setDescription(`${emojis.success} ${playlist.title} has been added to the queue.`)
    .setColor(color.success)
    .setFooter(`${playlist.track.length} song(s) in queue`)
    message.channel.send(playlistAdd)

};