const Transcript = require('reconlx')
const { MessageAttachment } = require('discord.js')

module.exports = {
    name: "transcript",
    aliases: ['save'],
    hidden: true,
    run: async (client, message, args) => {
        if (message.author.id !== '324921138713198593') return;
        Transcript.fetchTranscript(message, 99)
            .then((data) => {
                const file = new MessageAttachment(data, 'msgtranscript.html')
                message.channel.send(file)
            })
    }
}