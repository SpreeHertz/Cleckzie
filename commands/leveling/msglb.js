const { Client, Message, MessageEmbed } = require('discord.js');
const Levels = require('discord-xp');
const client = require('../../index');

module.exports = {
    name: 'messages-leaderboard',
    aliases: ['message-lb', 'msgslb', 'msgs-lb', 'leaderboard-messages', 'lb-messages'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10);

        // If no one's in leaderboard:
        if (rawLeaderboard.length < 1) {
            const noOne_ = new MessageEmbed()
                .setDescription("No one's in leaderboard yet.")
                .setColor("#FF0000")
            return message.channel.send(noOne_)
        }

        // roleColor
        const roleColor =
            message.guild.me.displayHexColor === "#000000"
                ? "#ffffff"
                : message.guild.me.displayHexColor;


        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true); // We process the leaderboard.

        let lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: **${e.level}**\nXP: **\`${e.xp.toLocaleString()}\`**\n`); // We map the outputs.
        const bienO_ = new MessageEmbed()

            .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
            .setTitle("Messages Leaderboard")
            .setDescription(lb, lb.join("\n\n"))
            .setColor(roleColor)
        message.channel.send(bienO_)

    }
}

