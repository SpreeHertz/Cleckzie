
const { MessageEmbed, Message } = require('discord.js');

module.exports = {
        name: "dump",
        description: "Shows members who have a particular role.",
    run: async (client, message, args) => {
     const roleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor;
        if (args.includes("@everyone")) return;
        if (args.includes("@here")) return;
        if (!args[0]) return message.reply('Please specify a role.')

        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase());

        if (!role) return message.reply('Couldn\'t find that role.')

        let membersWithRole = message.guild.members.cache.filter(member => {
            return member.roles.cache.find(r => r.name === role.name);
        }).map(member => {
            return member.user;
        })
        if (membersWithRole > 2048) return message.reply('The list is too long.')
        if (!membersWithRole) return message.reply('There are no members to dump.')

        if (membersWithRole) {
        const dumpEmbed = new MessageEmbed()
            .setColor(roleColor)
            .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
            .addField(`Dump role: `, `${role}`)
            .addField('Members:', `${membersWithRole.join("\n") || "No members."}`)
        return message.channel.send(dumpEmbed);
    }}
}
