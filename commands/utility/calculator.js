const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'calculator',
    aliases: ['calc'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        const { Calculator } = require('weky')
        await Calculator(message)
    }
}