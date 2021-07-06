const { MessageEmbed } = require("discord.js");
// trackstart embed
module.exports = (client, message, track) => {
    const trackStartEmbed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`${client.config.emojis.sparkle} Now playing [${track.title}](${track.url}) in :radio_button: **${message.member.voice.channel.name}.**`)
        .setclient.config.color(client.config.color.success)
    message.channel.send(trackStartEmbed)
};