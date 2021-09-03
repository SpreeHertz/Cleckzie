const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Returns websocket ping",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => { 
        let circles = {
            green: "🟢",
            yellow: "🟡",
            red: "🔴"
        }

        const embed = new MessageEmbed()
        .addField("Websocket",`${client.ws.ping <= 200 ? circles.green : client.ws.ping <= 400 ? circles.yellow : circles.red} ${client.ws.ping}ms`)
        .addField("RoundTrip", `${client.ws.ping <= 200 ? circles.green : client.ws.ping <= 400 ? circles.yellow : circles.red} ${client.ws.ping} ms`)
        .setColor("RANDOM")


        interaction.followUp({embeds: [embed]});
    },
};
