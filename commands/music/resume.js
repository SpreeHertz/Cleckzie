const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'resume',
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (!message.member.voice.channel) {
            const userNotinVC_ = new MessageEmbed()
                .setDescription("Please join a voice channel first.")
                .setColor("#FF0000")
            return message.channel.send(userNotinVC_)
        }
        // Embed if the user isn't in the same voice channel
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
            const notInSameVC_ = new MessageEmbed()
                .setDescription("You're not in the same channel as me.")
                .setColor("#FF0000")
            return message.channel.send(notInSameVC_)
        }

        const queue = client.player.getQueue(message);

        // If no music is currently playing
        if (!client.player.getQueue(message)) {
            const noMusicCurrentlyPlaying = new MessageEmbed()
                .setDescription("No song(s) are currently playing.")
                .setColor("#FF0000")
            return message.channel.send(noMusicCurrentlyPlaying)
        }

        if (!client.player.getQueue(message).paused) {
            const alreadyPlaying = new MessageEmbed()
                .setDescription(`${client.config.emojis.error} The music is already playing.`)
                .setColor(client.config.color.error)
            return message.channel.send(alreadyPlaying)
        }

        const success = client.player.resume(message);

        if (success) {
            const successfullyResumed = new MessageEmbed()
                .setDescription(`${client.config.emojis.success} The song has been resumed.`)
                .setColor(client.config.color.success)
            return message.channel.send(successfullyResumed)
        }


    }
}
