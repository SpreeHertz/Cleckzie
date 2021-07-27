const Discord = require('discord.js')
const ms = require("ms")
module.exports = {
    name: 'reminder',
    aliases: ['rem'],
    category: 'Utility',
    utilisation: `*rem [your reason]`,

    /**
        * @param {Client} client
        * @param {Message} message
        * @param {String[]} args
        */
    run: async (client, message, args) => {
        let time = args[0]
        if (!time) return message.channel.send("Run the commmand again, but mention the time when the reminder should be off.")
        if (ms(time) > ms("1w")) return message.reply(`${message.author.tag} You cannot set your reminder for more than 1w.`)

        let alert = args.slice(1).join(" ")
        if (!alert) return message.channel.send(`Run the command again, but mention the purpose of the reminder.`)
        let embed = new Discord.MessageEmbed()
            .setAuthor(`⏱ Your reminder has been set! `)
            .setColor("RANDOM")
            .setTimestamp()
            .addField('Time:', `\`\`\`fix\n${time}\`\`\``)
            .addField('Reason For:', `\`\`\`bash\n"${alert}"\`\`\``)
            .setFooter(
                `Requested by ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
            )
        message.reply(embed)
        setTimeout(() => {
            let DP = new Discord.MessageEmbed()
                .setAuthor(`⏰ Your reminder is off!`)
                .setColor("RANDOM")
                .setTimestamp()
                .addField('Duration:', `\`\`\`fix\n${time}\`\`\``)
                .addField('Reason For:', `\`\`\`bash\n"${alert}"\`\`\``)
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({ dynamic: true })
                )
            message.reply(DP)
        }, ms(time))
    }
}
