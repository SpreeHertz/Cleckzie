const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'pause',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        // Embed if the user isn't in a voice channel
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

        if (client.player.getQueue(message).paused) {
            const musicAlreadyPaused = new MessageEmbed()
                .setDescription(`${client.config.emojis.error} The music is already paused.`)
                .setColor(client.config.color.error)
            return message.channel.send(musicAlreadyPaused)
        }

        const success = client.player.pause(message);

        if (success) {
            const successfullyPaused = new MessageEmbed()
                .setDescription(`${client.config.emojis.success} The song **${client.player.getQueue(message).playing.title}** has been paused.`)
                .setFooter(`Do ${client.config.discord.prefix}resume to resume the song(s).`)
                .setColor(client.config.color.success)
            return message.channel.send(successfullyPaused)
        }


    }
}




