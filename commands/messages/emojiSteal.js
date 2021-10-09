const { Client, Message, MessageEmbed, Util } = require("discord.js");

module.exports = {
    name: "steal-emoji",
    aliases: ['emoji-stealer', 'ems'],
    usage: "*steal-emoji :superflushed:",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
    */
   run: async (client, message, args) => {
        if(!args.length) return message.reply(`Please specify some emojis.`)

        for (const rawEmoji of args) {
            const parsedEmoji = Util.parseEmoji(rawEmoji);

            if(parsedEmoji.id) {
              const extention = parsedEmoji.animated ? " .gif" : " .png";
              const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id + extention}`;
              message.guild.emojis.create(url, parsedEmoji.name)
                 .then((emoji) => message.channel.send(`Added: \`${emoji.url}\``));
            }
        }
   } 
}