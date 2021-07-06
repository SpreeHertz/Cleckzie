const { Message, MessageEmbed } = require("discord.js")

module.exports = {
    name: 'nowplaying',
    aliases: ['np'],
    description: 'Shows what is currently playing.',
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
        // If no music is currently playing
        if (!client.player.getQueue(message)) {
            const noMusicCurrentlyPlaying = new MessageEmbed()
                .setDescription("No song is currently playing.")
                .setColor("#FF0000")
            return message.channel.send(noMusicCurrentlyPlaying)
        }

        const track = client.player.nowPlaying(message);
        const filters = [];

        Object.keys(client.player.getQueue(message).filters).forEach((filterName) => client.player.getQueue(message).filters[filterName]) ? filters.push(filterName) : false;

        message.channel.send({
            embed: {
                color: 'RANDOM',
                author: { name: track.title },
                fields: [
                    { name: 'Channel', value: track.author, inline: true },
                    { name: 'Requested by', value: track.requestedBy.username, inline: true },
                    { name: 'From playlist', value: track.fromPlaylist ? 'Yes' : 'No', inline: true },

                    { name: 'Views', value: track.views, inline: true },
                    { name: 'Duration', value: track.duration, inline: true },
                    { name: 'Filters activated', value: filters.length + '/' + filters.length, inline: true },

                    { name: 'Volume', value: client.player.getQueue(message).volume, inline: true },
                    { name: 'Repeat mode', value: client.player.getQueue(message).repeatMode ? 'Yes' : 'No', inline: true },
                    { name: 'Currently paused', value: client.player.getQueue(message).paused ? 'Yes' : 'No', inline: true },

                    { name: 'Progress bar', value: client.player.createProgressBar(message, { timecodes: true }), inline: true }
                ],
                thumbnail: { url: track.thumbnail },
                timestamp: new Date(),
            },
        });
    },
};