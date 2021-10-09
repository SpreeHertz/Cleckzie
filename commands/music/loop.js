const { MessageEmbed } = require("discord.js");
const { color, footer, emojis } = require('../../config/bot')

module.exports = {
    name: 'loop',
    aliases: ['lp', 'repeat', 'l'],

    run: async (client, message, args) => {
  // Embed if the user isn't in a voice channel
if (!message.member.voice.channel) {
    const userNotinVC_ = new MessageEmbed()
    .setDescription("Please join a voice channel first.")
    .setColor("#FF0000")
    return message.channel.send(userNotinVC_)
    }
   // Embed if the user isn't in the same voice channel
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
        const notInSameVC_ = new MessageEmbed()
        .setDescription("You're not in the same channel as me.")
        .setColor("#FF0000")
        return message.channel.send(notInSameVC_)
    }

    const queue = client.player.getQueue(message);

    // If no music is currently playing
  if (!client.player.getQueue(message)) { 
    const noMusicCurrentlyPlaying = new MessageEmbed()
    .setDescription("No song(s) are currently playing.")
    .setColor("#FF0000")
    return message.channel.send(noMusicCurrentlyPlaying)
}


        if (args.join(" ").toLowerCase() === 'queue') {
            if (client.player.getQueue(message).loopMode) {
                client.player.setLoopMode(message, false);
            const repeatModeDisabled = new MessageEmbed()
            .setDescription(`${emojis.success} Repeat mode has been **disabled**.`)
            .setColor(color.success)
            return message.channel.send(repeatModeDisabled)

            } else {
                client.player.setLoopMode(message, true);
                const repeatModeEnabed = new MessageEmbed()
                .setDescription(`${emojis.success} Repeat mode has been **enabled**. The whole queue will be looped endlessly unless you execute this command again.`)
                .setColor(color.success)
                return message.channel.send(repeatModeEnabed)
            };
        } else {
            if (client.player.getQueue(message).repeatMode) {
                client.player.setRepeatMode(message, false);
                const repeatModeDisabledElse = new MessageEmbed()
                .setDescription(`${emojis.success} Repeat mode has been **disabled**.`)
                .setColor(color.success)
                return message.channel.send(repeatModeDisabledElse)
            } else {
                client.player.setRepeatMode(message, true);
                const repeatModeEnabledElse = new MessageEmbed()
                .setDescription(`${emojis.success} Repeat mode has been **enabled**. The whole queue will be looped endlessly unless you execute this command again.`)
                .setColor(color.success)
                return message.channel.send(repeatModeEnabledElse)
            };
        };
    },
};