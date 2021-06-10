const Discord = require("discord.js");

module.exports = {
    name: "goodmorning",
    aliases: ['good-morning', 'gm'],
    run: async(client, message, args) => {
        const embed = new Discord.MessageEmbed()
        .setTitle(":sun_with_face: ")
        .setColor('YELLOW')
        .setDescription("Good morning!")
        .setTimestamp()
        message.delete();
        message.channel.send(embed)
       

    }
}