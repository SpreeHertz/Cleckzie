const { Cilent, Message, MessageEmbed } = require('discord.js');
const Schema = require("../../models/chatbot-channel")
module.exports = {
    name: "set-chatbot-channel",
    aliases: ['setchannel. set-channel'],
    description: "First, run the `++set-chatbot-channel`. After that, the bot will start talking to you!",
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async (client, message, args) => {
        if(message.author.id !== '755826968901058682')
        return message.reply(`Only the bot owner can execute this due to API limits.`)


        const channel = message.mentions.channels.first() || message.channel;
        Schema.findOne({ guild: message.guild.id }, async(err, data) => {
            if (data) data.delete();
            new Schema({
                Guild: message.guild.id,
                Channel: channel.id,
            }).save();
            message.channel.send(`Successfully made the chatbot channel to ${channel}.`)
        })
    }
}