const { Message, MessageEmbed } = require('discord.js')

module.exports = {
    name : 'addrole',
    description: "Gives a role to a user. **Please be careful with this command. If you give wrong roles to the wrong user, it can give serious consequences for the server. We also have a remove role feature, just in case if that happens.**",
    usage: "*addrole @Miikie @Tester",
    run : async(client, message, args) => {
        /**
         * @param {Message} message
         */ 
        if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send('You do not have permission.')
        const target = message.mentions.members.first() 
        if(!target) {
            const embed = new MessageEmbed()
            .setTitle("Here's how to use this command")
            .setDescription("`addrole {user} {role}`")
            .setFooter('Do not literally type out {}.')
            .setColor("GOLD")
            .setAuthor(message.author.displayName, message.author.displayAvatarURL({ dynamic: true }))
        } 

        const role = message.mentions.roles.first() 
        if(!role) {  
            const noRoleEmbed = new MessageEmbed()
            .setTitle("Here's how to use this command:")
            .setDescription("`addrole {user} {role}`")
            .setFooter('Do not literally type out {}.')
            .setColor("GOLD")
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            return message.channel.send(noRoleEmbed)
        }
        
        await target.roles.add(role)
        message.channel.send(`${target.user.username} has obtained ${role} role.`)
    }
}