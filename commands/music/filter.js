const { client, Message, MessageEmbed } = require("discord.js")
const { filters, emojis, color } = require("../../config/bot");

module.exports = {
    name: 'filter',
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
        // If no music is currently playing
        if (!client.player.getQueue(message)) { 
            const noMusicCurrentlyPlaying = new MessageEmbed()
            .setDescription("No music is currently playing.")
            .setColor("#FF0000")
            return message.channel.send(noMusicCurrentlyPlaying)
        }
        // If a filter is not specified
        if (!args[0]) { 
            const specifyAFilter = new MessageEmbed()
            .setDescription("Please specify a filter to `enable` or `disable`.")
            .addField("Example", "`*filter 8D`")
            return message.channel.send(specifyAFilter)
        }

        const filterToUpdate = filters.find((x) => x.toLowerCase() === args[0].toLowerCase());

        if (!filterToUpdate) {
            const filterNotFound_ = new MessageEmbed()
            .setDescription("That filter doesn't exist. Here's the list of filters:\n\n`8D`\n`gate`\n`haas`\n`phaser`\n`treble`\n`tremolo`\n`vibrato`\n`reverse`\n`karaoke`\n`flanger`\n`mcompand`\n`pulsator`\n`subboost`\n`bassboost`\n`vaporwave`\n`nightcore`\n`normalizer`\n`surrounding`")
            .setColor("#FF0000")
            return message.channel.send(filterNotFound_)
        }
        

        const filtersUpdated = {};

        filtersUpdated[filterToUpdate] = client.player.getQueue(message).filters[filterToUpdate] ? false : true;

        client.player.setFilters(message, filtersUpdated);

        if (filtersUpdated[filterToUpdate]) {
            const enablingFilter = new MessageEmbed()
            .setTitle(`${emojis.loading} Enabling Filter`)
            .setDescription("I'm **enabling** the filter. Please wait...")
            .setColor("#04FF00")
            .setFooter("The longer the music is, the longer this will take.")
            message.channel.send(enablingFilter)
        } else {
           const disablingFilter = new MessageEmbed()
           .setTitle(`${emojis.loading} Disabling Filter`)
           .setDescription("I'm **disabling** the filter. Please wait...")
           .setColor(color.error)
           .setFooter("The longer the music is, the longer this will take.")
           message.channel.send(disablingFilter)
        } 
    },
};


