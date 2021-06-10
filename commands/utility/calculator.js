const { Client, Message, MessageEmbed } = require('discord.js');
const { filters, emojis, color, footer } = require('../../config/bot');

module.exports = {
    name: 'calculator',
    aliases: ['calc'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const { Calculator } = require('weky')
        await Calculator(message)
    }
}