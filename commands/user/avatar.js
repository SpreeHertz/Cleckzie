const { Client, Message, MessageEmbed } = require('discord.js')
const search = require("discord.js-search");


module.exports = {
    name: 'avatar',
    aliases: ['av'],
    
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        let query = args.join(" ");

        if (!query) {
        const authorAvatar = new MessageEmbed()
        .setTitle(`Your avatar:`)
        .setColor('RANDOM')
        .setImage(message.author.displayAvatarURL({ dynamic: true, size: 4096 }))
        .setDescription(`[jpeg](${message.author.displayAvatarURL({ dynamic: true, format: 'jpeg'})}) \`|\` [gif](${message.author.displayAvatarURL({ dynamic: true, format: 'gif'})}) \`|\` [jpg](${message.author.displayAvatarURL({ dynamic: true, format: 'jpg'})}) \`|\` [png](${message.author.displayAvatarURL({ dynamic: true, format: 'png'})}) \`|\` [webp](${message.author.displayAvatarURL({ dynamic: true, format: 'webp'})})`)

        return message.channel.send(authorAvatar)
    }
        search.searchMember(message, query).then(x => {
            const embed = new MessageEmbed()
            .setTitle(`${x.user.tag}'s avatar:`)
            .setColor('RANDOM')
            .setImage(x.user.displayAvatarURL({ size: 4096, dynamic: true }))
            message.reply({ embed: embed, allowedMentions: { repliedUser: true } });
            
        })
    }
}