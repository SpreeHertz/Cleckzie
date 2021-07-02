const { Client, Message, MessageEmbed } = require('discord.js');
const { filters, emojis, color, footer } = require('../../config/bot');


module.exports = {
    name: 'beg',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const mongoCurrency = require('discord-mongo-currency');
 
        const randomCoins = Math.floor(Math.random() * 99) + 1; // Random amount of coins.
        
        await mongoCurrency.giveCoins(message.member.id, message.guild.id, randomCoins)
        message.channel.send(`The gods hae gave you ${randomCoins} coins.`)
        

    }
}