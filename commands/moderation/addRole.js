const { Message } = require('discord.js')

module.exports = {
    name : 'addrole',
    description: "Gives a role to a user. **Please be careful with this command. If you give wrong roles to the wrong user, it can give serious consequences for the server. We also have a remove role feature, just in case if that happens.**",
    usage: "*addrole @Miikie @Tester",
    run : async(client, message, args) => {
        //lets use parameters (optional)
        /**
         * @param {Message} message
         */
        //so firstly we will check whether the author of the message has permissions
        //this line means if the author doesn't have manage roles permission it will stop the process and send the following text
        if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send('You do not have permission.')
        //next we define some variables
        const target = message.mentions.members.first() //member = mentions
        if(!target) return message.channel.send(':x: No member specified.') //when no member is pinged
        const role = message.mentions.roles.first() // roles = mentions
        if(!role) return message.channel.send(':x: No role specified.') //when no role is specified or pinged
        //now the code!
        await target.roles.add(role) // adding the role to the user
        message.channel.send(`${target.user.username} has obtained ${role} role.`)
    }
}