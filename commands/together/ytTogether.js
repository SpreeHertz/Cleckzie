const { Discord, MessageEmbed } = require('discord.js')
const { filters, emojis, color, footer } = require('../../config/bot');
const { DiscordTogether } = require('discord-together');
module.exports = {
    name: 'youtube-together',
    aliases: ['ytt', 'yt-start'],
    description: "Watch YouTube with your friends, on discord!",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        client.discordTogether = new DiscordTogether(client);
        if (!message.member.voice.channel) {
              const joinvoice = new MessageEmbed()
              .setDescription(`${emojis.error} Please join a voice channel first.`)
              .setColor(color.error)
              return message.channel.send(joinvoice)
        }
        if(message.member.voice.channel) {
            client.discordTogether.createTogetherCode(message.member.voice.channelID, 'youtube').then(async invite => {
               const embed = new MessageEmbed()
               .setTitle('YouTube Together')
               .setDescription(`${emojis.youtube} [Click here](${invite.code}) to watch YouTube Together.`)
               .setColor('#FF6969')
               return message.channel.send(embed)
            });
        }
    }  
}