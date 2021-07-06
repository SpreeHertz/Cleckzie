const { Client, Message, MessageEmbed } = require('discord.js');

let begExamples = [
    "The gods have given you",
    "Apaira has given you",
    "Mr.DN has given you",
    "Helda Dik has given you",

]

module.exports = {
    name: 'beg',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        const mongoCurrency = require('discord-mongo-currency');

        const randomCoins = Math.floor(Math.random() * 99) + 1; // Random amount of coins.

        await mongoCurrency.giveCoins(message.member.id, message.guild.id, randomCoins)
        message.channel.send(`${begExamples[Math.floor(Math.random() * begExamples.length)] + ` ${randomCoins}` + " coins!"}`)


    }
}