const { Cilent, Message, MessageEmbed } = require('discord.js');
const ms = require('ms')
let mdur = require('moment-duration-format')
let moment = require('moment')
const { DiscordVoice } = require("discord-voice");
const { duration } = require('moment');
const Schema = require('../../models/voiceleaderboard')

module.exports = {
    name: "voice-time",
    aliases: ['vctime', 'voicetime'],
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async (client, message, args) => {
        const roleColor =
      message.guild.me.displayHexColor === "#000000"
        ? "#ffffff"
        : message.guild.me.displayHexColor;
       
        const target = message.mentions.users.first() || message.author;
        
        
        
const user = await client.discordVoice.fetch(target.id, message.guild.id); // Selects the target from the database.

if (!user) {
    const nuser_ = new MessageEmbed()
    .setDescription(`:x: Seems like the user has **no voice activity** so far.`)
    .setColor("#FF0000")
    return message.channel.send(nuser_)

} 

const bien = new MessageEmbed()
.setDescription(`${target.tag} currently has **${user.data.voiceTime.total, moment.duration(user.data.voiceTime.total).format(' D [days], H [hours], m [mins]')}** of total voice time.`)
.setColor(roleColor)
message.channel.send(bien)
    }
}