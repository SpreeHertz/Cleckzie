const { Client, Message, MessageEmbed, MessageReaction } = require('discord.js');
const translate  = require('@iamtraction/google-translate')

module.exports = {
    name: "translate",
    category: "messages",
    description: "Translates a language to English.",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
    const query = args.join(" ");
    if(!query) return message.reply("Please specify a text to translate.")

    const translated = await translate
    (query, { to: 'en' });
    const embed = new MessageEmbed()
    .setTitle("Translation Output:")
    .setDescription(translated.text)
    .setColor("RANDOM")
    .setTimestamp()
    message.channel.send(embed);







}}
