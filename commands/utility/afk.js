const db = require('quick.db')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name : 'afk',
    run : async(client, message, args) => {
        const roleColor =
      message.guild.me.displayHexColor === "#000000"
        ? "#ffffff"
        : message.guild.me.displayHexColor;

        const content = args.join(" ") || "No reason provided."
        await db.set(`afk-${message.author.id}+${message.guild.id}`, content)
        
        const embed = new MessageEmbed()
        .setDescription(`You have been set to AFK.\n**Reason:** ${content}`)
        .setColor(roleColor)
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic : true }))
        message.channel.send(embed)                
    }
}