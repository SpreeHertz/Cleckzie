const { Message, MessageEmbed } = require('discord.js');
const { normalizeUnits } = require('moment');
const moment = require('moment');
const { color, emojis, footer } = require('../../config/bot')

module.exports = {
    name: "roleinfo",
    aliases: ["role"],
 run: async(client, message, args) => {

        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
        if(!role) {
            const noRole = new MessageEmbed()
            .setDescription(`${emojis.error} Please specify a role either by its ID or mention.`)
            .setColor(color.error)
            return message.channel.send(noRole) 
        }
        const pos = (message.guild.roles.cache.size - role.position)
        const embed = new MessageEmbed()
        
        .setTitle(`Role Info For ${role.name}`)
        .addField('Name:', role, true)
        .addField('ID:', `\`${role.id}\``, true)
        .addField('Color:', `\`${role.hexColor.toUpperCase()}\``, true)
        .addField('Obtained Users', `\`${role.members.size}\` Users`, true)
        .addField('Position:', `\`${pos}\``, true)
        .addField('Created at:', `\`${moment(role.createdAt).format('DD/MMM/YYYY')}\``, true)
        .addField('Permissions', `\`\`\`${role.permissions.toArray().map(P => (P[0] + P.slice(1)).toLowerCase().replace(/_/g, " ")).sort().join(", ")}\`\`\``)
        .setColor(role.hexColor)

        message.channel.send(embed)

        
    }
}