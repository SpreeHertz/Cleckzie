const { MessageEmbed } = require("discord.js");
const { colors, filter, emojis } = require('../config/bot')
module.exports = (client, error, message, args) => {
    switch (error) {

        case 'NotPlaying':
            const notPlayingEmbed = new MessageEmbed()
            .setDescription(`${emojis.error} There is no music being played on the server.`)
            .setColor("#FF0000")
            return message.channel.send(notPlayingEmbed)
            break;

        case 'NotConnected':
            const NotConnectedEmbed = new MessageEmbed()
            .setDescription(`${emojis.error} You aren't connected to any voice channel. Please connect one first.`)
            .setColor("#FF0000")
            message.channel.send(NotConnectedEmbed)
            break;


        case 'UnableToJoin':
            const UnableToJoinEmbed = new MessageEmbed()
            .setDescription(`${emojis.error} I am unable to join your voice channel. Please check my permissions!`)
            .setColor("#FF0000")
            message.channel.send(UnableToJoinEmbed)
            break;

        case 'VideoUnavailable':
         const VideoUnavailableEmbed = new MessageEmbed()
         .setDescription(`${emojis.error} ${args[0].title} is not avaible in your country. Skipping...`)
         .setColor("#FF0000")
         message.channel.send(VideoUnavailableEmbed)   
         break;

        case 'MusicStarting':
            const MusicStartingEmbed = new MessageEmbed()
            .setDescription("The music is starting. Please wait and retry.")
            .setColor("#FF0000")
            message.channel.send(MusicStartingEmbed)
            break;

        default:
            const defaultErrorEmbed = new MessageEmbed()
            .setTitle(`${emojis.error} An error had occured!`)
            .setDescription(`Error: \n \`\`\`${error}\`\`\``)
            .setColor("#FF0000")
            message.channel.send(defaultErrorEmbed)
    };
};