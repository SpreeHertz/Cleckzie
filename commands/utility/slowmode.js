const { Client, Message, MessageEmbed } = ('discord.js');
const ms = require('ms');

module.exports = {
    name: "slowmode",
    description: "Puts slowmode on the channel. The user who is requesting this command must have the **Manage Channels** permission. Do `e!slowmode` to remove slowmode.",
    category: 'moderation',
    aliases: ['slow'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async (client, message, args) => {
        if (!message.member.permissions.has('MANAGE_CHANNELS')) return;
        if (!args[0]) {
            message.channel.setRateLimitPerUser(0);
            return message.channel.send(`The slowmode on ${message.channel} has been removed.`)
        }

        const raw = args[0];
        const milliseconds = ms(raw);

        if (isNaN(milliseconds)) return message.reply('This is not a valid time!');
        if (milliseconds < 1000) return message.reply('The minimum slow mode is 1 second.');


        message.channel.setRateLimitPerUser(milliseconds / 1000);
        try {
            const slowmodeApplied = new MessageEmbed()
                .setDescription(`${client.config.emojis.success} The slowmode has been set to ${ms(milliseconds, { long: true })}.`)
                .setColor(client.config.color.success)
        }

        catch (error) {
            const embed = new MessageEmbed()
                .setDescription(`${client.config.emojis.error} An error had occured:\n \`\`\`${error}\`\`\``)
                .setColor(client.config.client.config.color.error)
            return message.channel.send(embed)
        };

    }
}