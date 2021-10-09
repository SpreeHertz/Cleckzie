const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'play',
    aliases: ['p'],

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

        if (!args[0]) { 
        const indicateTitle = new MessageEmbed()
        .setDescription("Please specify a song name/URL.")
        .setColor("#FF0000")
        return message.channel.send(indicateTitle)
        }

        client.player.play(message, args.join(" "), { firstResult: true });
    },
};