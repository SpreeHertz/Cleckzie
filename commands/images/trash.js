const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');
const { Canvas } = require("canvacord")
module.exports = {
    name: 'trash',
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const user = message.mentions.users.first()
    if (!user) return message.reply("@ someone.")

        const avatar = user.displayAvatarURL({ format: "png" })

        const img = await Canvas.delete(user.displayAvatarURL({ dynamic: true }))

        message.channel.send(
            new MessageAttachment(img, "deletetrash.png")
        )
    }
}
