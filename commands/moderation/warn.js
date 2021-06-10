const db = require('../../models/warns')
const { Message, MessageEmbed, GuildMemberManager, TeamMember } = require("discord.js");

module.exports = {
    name: "warn",
    run: async (client, message, args) => {
        if (!message.member.hasPermission('ADMINISTRATOR'))
        return message.channel.send(`You need **Administrator** permission in order to run this command.`)

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!user)
            return message.channel.send(
                new MessageEmbed()
                    .setTitle('User not found.')
                    .setDescription(`Make sure you mention the member that it's in the guild!`)
                    .setColor("RED")
                    .setTimestamp()
            )
        const reason = args.slice(1).join(" ")
        db.findOne({ guildid: message.guild.id, user: user.user.id }, async (err, data) => {
            if (err) throw err;
            if (!data) {
                data = new db({
                    guildid: message.guild.id,
                    user: user.user.id,
                    content: [
                        {
                            moderator: message.author.id,
                            reason: reason
                        }
                    ]
                })
            } else {
                const obj = {
                    moderator: message.author.id,
                    reason: reason
                }
                data.content.push(obj)
            }
            data.save()
        });
        user.send(new MessageEmbed()
            .setDescription(`You have been **warned** by ${message.author.tag}\n**Reason:** ${reason}`)
            .setColor("RED")
        )
        message.channel.send(new MessageEmbed()
        .setColor("RANDOM")
            .setDescription(`${user} has been **warned!**\n**Responsible Moderator:** ${message.author.tag}\n**Reason:** ${reason}`).setColor('BLUE')
            .setTimestamp()
        )
    }
}