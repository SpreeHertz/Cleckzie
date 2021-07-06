const { Cilent, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: "member-count",
    aliases: ['mcount', 'members', 'membercount'],
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async (client, message, args) => {

        const embed = new MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL({ dyanmic: true }))
            .setDescription(`${client.config.emojis.info.info} ${message.guild.memberCount}`)
            .setTimestamp()
            .setColor('RANDOM')

        message.channel.send(embed)
    }
}