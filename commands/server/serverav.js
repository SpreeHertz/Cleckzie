const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'server-avatar',
    aliases: ['server-av', 'srvr-av', 's-av'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        // Defining the roleColor 
        const roleColor = message.guild.me.displayHexColor === "#000000"
        ? "#ffffff"
        : message.guild.me.displayHexColor;

       // the embed
      const embed = new MessageEmbed()
      .setAuthor(message.guild.name)
      .setTitle("Server Avatar")
      .setImage(message.guild.iconURL({ dynamic: true, size: 512 }))
      .setTimestamp()
      .setColor(roleColor)
      message.channel.send(embed)
    }
}