const { Cilent, Message, MessageEmbed } = require('discord.js');
const txtgen = require('txtgen')
const { FastType } = require('weky')

module.exports = {
    name: "fast-type",
    aliases: ['type-fast', 'type', 'fasttype'],
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async (client, message, args) => {
const game = new FastType({
    message: message,
    winMessage: "GG you won.", //message sent when user types perfectly
    sentence: txtgen.sentence(), //sentence-to-be-typed
    loseMessage: `Sorry but you've lost.`, //message sent when user misspell it
    time: 50000, //time that user has to type in ms
    startMessage: 'Good Luck.' //message sent when user starts playing
})
game.start()
    }
}