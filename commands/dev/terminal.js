const { Client, Message, MessageEmbed } = require('discord.js');
const child = require("child_process");
const devID = require('../../config/bot').devs;  
module.exports = {
    name: "terminal",
    description: "Interacts with the bot. Only the bot owner is allowed to use this command.",
    aliases: ['term'],
    category: "bot",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if(message.author.id !== devID) return;

        const command = args.join(" ");
        if(!command) return message.reply('Please specify a command to execute.')

        child.exec(command, (err, res) => {
            if(err) return console.log(err);
            message.channel.send(res.slice(0, 2000), { code: "js"})
        })
    }
}