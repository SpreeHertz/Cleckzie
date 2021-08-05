const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Levels = require('discord-xp')
const canvacord = require('canvacord');
const { color, gradient } = require('canvacord/src/Canvacord');

module.exports = {
    name: 'rank',
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        // Rank
        const target = message.mentions.users.first() || message.author;
        const user = await Levels.fetch(target.id, message.guild.id);
        const neededXp = Levels.xpFor(parseInt(user.level)+ 1);

        // roleColor
        const roleColor =
        message.guild.me.displayHexColor === "#000000"
         ? "#ffffff"
         : message.guild.me.displayHexColor;


        // If the user mentioned/message.author has no XP:
        if (!user) {
            const nuser_ = new MessageEmbed()
            .setDescription(`:x: Seems like the user has **no XP** so far.`)
            .setColor("#FF0000")
            return message.channel.send({embeds: [nuser_]})
        }

        // Rank Card
        const rank = new canvacord.Rank()
    .setAvatar(target.displayAvatarURL({ dynamic: false, format: 'png'}))
    .setCurrentXP(user.xp)
    .setRequiredXP(neededXp)
    .setLevel(user.level)
    .setStatus(target.presence.status)
    .setProgressBar("#F69699")
    .setBackground("IMAGE", "https://cdn.discordapp.com/attachments/790289078985818112/835892079572811837/rankcard_background.png")
    .setUsername(target.username)
    .setDiscriminator(target.discriminator, "#00ff6a")
    rank.build()
    .then(data => {
        const attachment = new MessageAttachment(data, 'rankcard.png')
        message.channel.send(attachment)
    })

    }
}
