const { Client, Message, MessageEmbed } = require('discord.js');
const { filters, emojis, color, footer } = require('../../config/bot');
const { Button } = require('discord-buttons');

module.exports = {
    name: 'shufg',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        var randomWords = require('random-words');
        const word = randomWords();
        
        const { ShuffleGuess } = require('weky');
        const game = new ShuffleGuess({
                      message: message,
                      word: word, //or a simple word
                      winMessage: "GG you won!", //message sent when user's message matches with the word
                      colorReshuffleButton: 'green', //color of the reshuffle button (regen)
                      messageReshuffleButton: 'reshuffle', //text of the reshuffle button (regen)
                      colorCancelButton: 'red', //color of the cancel button (exit, quit, stop)
                      messageCancelButton: 'cancel', //text of the cancel button
                      client: client
        });
        game.start();
    }
}