const { Cilent, Message, MessageEmbed, MessageAttachment } = require('discord.js');
const { Canvas } = require("canvacord")

module.exports = {
    name: "blur",
    category: "images",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
run: async (client, message, args) => {
    const user = message.mentions.users.first()
    if (!user) return message.reply("@ someone.")


    const avatar = user.displayAvatarURL({ format: "png" });

    const image = await Canvas.blur(message.author.displayAvatarURL({ format: 'png' }),
     avatar
     );

    message.channel.send(
        new MessageAttachment(image, 'cleckziedb.gif')
    )
}

}