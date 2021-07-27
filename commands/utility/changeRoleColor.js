const { Client, Message, MessageEmbed } = require('discord.js');
module.exports = {
    name: 'role-color',
    usage: 'role-color @Owner #ff0000',
    aliases: ['color-role', 'change-role-color', 'rolecolor', 'rlc'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        // Defining
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase());
        const color = args[1];

        // Embed sent if no role is specified
        if (!role) {
            const noRoleSpecified = new MessageEmbed()
                .setDescription(`${client.config.emojis.error} Please specify a role.`)
                .setColor("#FF0000")
            return message.channel.send(noRoleSpecified)
        }

        // Embed sent if user has no permission
        if (!message.member.permissions.has("MANAGE_ROLES")) {
            const noPermissions = new MessageEmbed()
                .setDescription(`${client.config.emojis.error} You don't have the following permission: \`Manage Roles\``)
                .setColor("#FF0000")
            return message.channel.send(noPermissions)
        }

        // Embed sent if the bot has no permission
        if (!message.guild.me.hasPermission('MANAGE_ROLES')) {
            const botHasNoPerms = new MessageEmbed()
                .setDescription(`${client.config.emojis.error} The command couldn't run because I don't have the permission to \`Manage Roles\`.`)
                .setColor("#FF0000")
            return message.channel.send(botHasNoPerms)
        }
        // Embed sent if the color isn't specified
        if (!color) {
            const specifyColor = new MessageEmbed()
                .setDescription(`${client.config.emojis.error} Please specify a color for me to change. You can say a [hex color code](https://htmlcolorcodes.com).\n(Example: \`#FF0000\`)`)
                .setColor('#FF0000')
            return message.channel.send(specifyColor)
        }

        try {
            await role.setColor(color)
            const successEmbed = new MessageEmbed()
                .setDescription(`${client.config.emojis.success} Successfully changed ${role}'s color to \`${color}\`.`)
                .setColor(color)
            message.channel.send(successEmbed)

        }
        catch (error) {
            const errorEmbed = new MessageEmbed()
                .setTitle('Error')
                .setDescription(`${client.config.emojis.error} Please hoist my role above the role you mentioned so I can change the color.`)
                .setImage('https://cdn.discordapp.com/attachments/790289078985818112/844599883998429214/unknown.png')
                .setColor("#FF0000")
            return message.channel.send(errorEmbed)
        }

    }
}


