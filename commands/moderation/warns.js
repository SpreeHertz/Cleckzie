const db = require('../../models/warns')
const { Message, MessageEmbed } = require("discord.js");

module.exports = {
    name: "warns",
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
            if (data.content.length) {
                message.channel.send(new MessageEmbed()
                .setTitle(`${user.user.tag}'s warns`)
                .setDescription(
                    data.content.map(
                        (w, i ) =>
                        `\`${i + 1}\` | Moderator: ${message.guild.members.cache.get(w.moderator)}\n Reason: ${w.reason}`
                        .setColor("PURPLE")
                        )
                )
                )
            } else {
                message.channel.send(`:partying_face: The user has no warns!`)
            }
        })
    }
}
