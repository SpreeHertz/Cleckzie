const { MessageEmbed, Message, Client } = require("discord.js");

module.exports = {
    name : 'info',
    category : 'info',
    run : async(client, message, args) => {
        const embed = new MessageEmbed()
        .setTitle("Cleckzie bot")
        .addField("Made by:", "SpreeHertz#0001")
        .addField("Twitter plug:", "https://twitter.com/SpreeHertz")
        .addField("Hosted on:", "Heroku")
        .addField("Language", "discord.js")
        .setFooter("Feel free to send suggestions or report bugs in my Discord/Twitter.")
        .setColor("#FFAAAA")
       message.channel.send(embed)

}}        