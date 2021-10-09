const { Cilent, Message, MessageEmbed, MessageAttachment } = require('discord.js');
const { Canvas } = require("canvacord")

module.exports = {
    name: "wanted",
    category: "images",
    description: "Image manipulation command, makes a person wanted.",
    
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
run: async (client, message, args) => {
    const user = message.mentions.users.first() || message.author;

    const avatar = user.displayAvatarURL({ format: "png" });

    const image = await Canvas.wanted(avatar);

    message.channel.send(
        new MessageAttachment(image, 'cleckziedb.gif')
    )
}

}