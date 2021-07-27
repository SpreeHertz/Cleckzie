const { Client, Message, MessageEmbed } = require('discord.js');
const radio = require('../../json/radiostations.json')

module.exports = {
    name: 'radio',
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (!message.member.voice) {
            message.channel.send({ embed: { color: 15158332, description: 'Please connect to a voice channel.' } }).then(m => m.delete({ timeout: 3500 }));
            message.delete();
            return;
        }
        // Check if bot can join channel
        if (!message.guild.me.hasPermission('CONNECT')) {
            if (message.deletable) message.delete();
            message.channel.send({ embed: { color: 15158332, description: `${client.config.emojis.error} I am missing the permission: \`CONNECT\`.` } }).then(m => m.delete({ timeout: 10000 }));
            bot.logger.error(`Missing permission: \`CONNECT\` in [${message.guild.id}].`);
            return;
        }
        // Check if bot can speak in channel
        if (!message.guild.me.hasPermission('SPEAK')) {
            if (message.deletable) message.delete();
            message.channel.send({ embed: { color: 15158332, description: `${client.config.emojis.error} I am missing the permission: \`SPEAK\`.` } }).then(m => m.delete({ timeout: 10000 }));
            bot.logger.error(`Missing permission: \`SPEAK\` in [${message.guild.id}].`);
            return;
        }

        // Make sure an entry was included



    }
}
