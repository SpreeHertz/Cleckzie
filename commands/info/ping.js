const {  Discord, Message, MessageEmbed } = require('discord.js');
const client = require('../../index')

module.exports = {
    name: "ping",
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async (client, message, args) => {
        const roleColor =
      message.guild.me.displayHexColor === "#000000"
        ? "#ffffff"
        : message.guild.me.displayHexColor;

        let circles = {
            green: "🟢",
            yellow: "🟡",
            red: "🔴"
        }
      const msg = await message.channel.send(new MessageEmbed()
        .setColor("RED") //you can change this
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .addField("Websocket",
            `${client.ws.ping <= 200 ? circles.green : client.ws.ping <= 400 ? circles.yellow : circles.red} ${client.ws.ping}ms`
        ))

        let ping = msg.createdTimestamp - message.createdTimestamp;

        msg.edit(
            new MessageEmbed()
            .setColor(roleColor)
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .addField("Websocket",
            `${client.ws.ping <= 200 ? circles.green : client.ws.ping <= 400 ? circles.yellow : circles.red} ${client.ws.ping}ms`
        )
            .addField("RoundTrip",
            `${ping <= 200 ? circles.green : ping <= 400 ? circles.yellow : circles.red} ${ping} ms `
            )
        )
    }
}
