const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'roster',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (message.guild.id != '732935078870646816') return;
        const embed = new MessageEmbed()
        .setTitle(`Medal's Roster`)
        .setThumbnail(message.guild.iconURL({dynamic: true}))
        .addField("🏅 | Owner", "- Kabir")
        .addField(":medal: | Management", "- Psuedo\n- Harshul")
        .addField(":medal: | Fortnite", "- Cigol\n- DNA\n- Zxmbie\n- Malkawi")
        .addField(":medal: | Content Creators", "- Kummi\n- Annihilator\n- SauraXD")
        .addField(":medal: | Production", "- Lordedits\n- gmspn\n- SpiderX")
        .setColor("BLUE")
        message.channel.send(embed)
    }
}