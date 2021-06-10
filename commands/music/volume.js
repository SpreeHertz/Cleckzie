const { Client, Message, MessageEmbed } = require('discord.js');
const { filters, emojis, color, footer } = require('../../config/bot');

module.exports = {
    name: 'volume',
    aliases: ['vol'],
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

    const queue = client.player.getQueue(message);

    // If no music is currently playing
  if (!client.player.getQueue(message)) { 
    const noMusicCurrentlyPlaying = new MessageEmbed()
    .setDescription("No song(s) are currently playing.")
    .setColor("#FF0000")
    return message.channel.send(noMusicCurrentlyPlaying)
}

               
        
                if (!args[0] || isNaN(args[0]) || args[0] === 'Infinity') {
                    const ifNaN = new MessageEmbed()
                    .setDescription(`${emojis.error} Please enter a valid number between **1-100**.`)
                    .setColor(color.error)
                    return message.channel.send(ifNaN)
                }
        
                if (Math.round(parseInt(args[0])) < 1 || Math.round(parseInt(args[0])) > 100) {
                    const validNumber = new MessageEmbed()
                    .setDescription(`${emojis.error} Please enter a  valid number between **1-100**.`)
                    .setColor(color.error)
                }
        
                const success = client.player.setVolume(message, parseInt(args[0]));
        
                if (success) {
                    const successfullyChangedVol = new MessageEmbed()
                    .setDescription(`${emojis.success} The volume has been changed to **${parseInt(args[0])}%**!`)
                    .setColor(color.success)
                    return message.channel.send(successfullyChangedVol)
                }
       
        
    }
}