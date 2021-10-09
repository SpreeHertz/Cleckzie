const { Cilent, Message, MessageEmbed, MessageAttachment } = require('discord.js');
const { Canvas } = require("canvacord")

module.exports = {
    name: "triggered",
    category: "images",
    description: "Makes you triggered.",
    
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
run: async (client, message, args) => {
    const user = message.mentions.users.first() || message.author;

    const avatar = user.displayAvatarURL({ format: "png" });

    const image = await Canvas.trigger(avatar);

    message.channel.send(
        new MessageAttachment(image, 'cleckziedb.gif')
    )
}

}