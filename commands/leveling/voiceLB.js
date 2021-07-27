const { Cilent, Message, MessageEmbed } = require('discord.js');
const ms = require('ms')
let mdur = require('moment-duration-format')
let moment = require('moment')
const { DiscordVoice } = require("discord-voice");
const { duration } = require('moment');
const Schema = require('../../models/voiceleaderboard')

module.exports = {
    name: "voice-leaderboard",
    aliases: ['voice-lb', 'lb-voice', 'voicelb', 'vclb'],
    description: "Shows the leaderboard on users who've spent time on voice channels.",
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async (client, message, args) => {
        const rawLeaderboard = await client.discordVoice.fetchLeaderboard(message.guild.id, 10); // Wtop 10 users with the most voice time

if (rawLeaderboard.length < 1) {
    const noOne_ = new MessageEmbed()
    .setDescription("No one's in leaderboard yet.")
    .setColor("#FF0000")
    return message.channel.send(noOne_)
}

const roleColor =
      message.guild.me.displayHexColor === "#000000"
        ? "#ffffff"
        : message.guild.me.displayHexColor;


const leaderboard = await client.discordVoice.computeLeaderboard(client, rawLeaderboard, true);
let lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nVoice Time: **${e.voiceTime.total, moment.duration(e.voiceTime.total).format(' D [days], H [hours], m [mins]')}**\n`)
const bienn_ = new MessageEmbed()
.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
.setTitle("Voice Time Leaderboard")
.setDescription(lb, lb.join("\n\n"))
.setAuthor(message.guild.name)
.setTimestamp()
.setColor(roleColor)
message.channel.send(bienn_)

    }
}
