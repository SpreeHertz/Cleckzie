const { Message } = require('discord.js');

module.exports = {
    name: 'nuke',
    aliases: ['destroy'],
    description: 'Nukes the channel.',
    category: 'moderation',
    hidden: true,
    /**
     * @param {*} client
     * @param {Message} message
     * @param {*} args
     */
    run: async (cilent, message, args) => {
        if(message.author.id !== '552537873266507777')
        return message.reply(`Hey! You can't use that.`)
        if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.reply(':x: I need the following permission(s): **"Manage Channels"**')

        message.channel.clone().then((ch) => {
            ch.setParent(message.channel.parent.id);
            ch.setPosition(message.channel.position);
            message.channel.delete();

            ch.send(`The channel has been nuked! | **Requested by: ${message.author.tag}** | https://tenor.com/view/explosion-explode-clouds-of-smoke-gif-17216934`)

        })
    }
}
