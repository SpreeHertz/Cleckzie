const { FetchTranscript } = require('reconlx')
const { MessageAttachment } = require('discord.js')
const fetchTranscript = require('reconlx/data/functions/fetchTranscript/fetchTranscript')

module.exports = {
    name: "transcript",
    aliases: ['save'],
    hidden: true,
    run: async(client, message, args) => {
            if(message.author.id !== '552537873266507777') return;
        fetchTranscript(message, 99)
        .then((data) => {
            const file = new MessageAttachment(data, 'msgtranscript.html')
            message.channel.send(file)
        })
    }
}