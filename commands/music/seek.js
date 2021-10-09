const { Client, Message, MessageEmbed } = require('discord.js');
const { filters, emojis, color, footer } = require('../../config/bot');

module.exports = {
    name: 'seek',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
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
    
    const success = client.player.seek(message, time)
    if (success) {
        const seekEmbed = new MessageEmbed()
        .setDescription(`${emojis.success} The song has been seeked to ${time}.`)
        .setColor(color.success)
        return message.channel.send(seekEmbed);    
    }
    

    }
};