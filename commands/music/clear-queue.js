 const { Message, MessageEmbed } = require("discord.js")
const emojis = require("../../config/bot").emojis;

module.exports = {
    name: 'clear-queue',
    aliases: ['cq', 'clear'],
    description: `Clears the queue.`,
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
    // If no music is currently playing
    if (!client.player.getQueue(message)) { 
        const noMusicCurrentlyPlaying = new MessageEmbed()
        .setDescription("No music is currently playing.")
        .setColor("#FF0000")
        return message.channel.send(noMusicCurrentlyPlaying)
    }

        if (client.player.getQueue(message).tracks.length <= 1) { 
            const only1SonginQueue = new MessageEmbed()
            .setDescription("There's only one song in the queue.")
            .setColor("#FF0000")
            return message.channel.send(only1SonginQueue)
        }

        client.player.clearQueue(message);

        const queueCleared = new MessageEmbed()
        .setDescription("The queue has been successfully cleared.")
        .setColor("#04FF000")
        message.channel.send(queueCleared)
    },
};