
const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'bannedusers',
    category : 'moderation',
    aliases : ['fetchBans', 'banneds'],
    description : 'This command allows you to know the users who have been banned in the server.',
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        if (!message.member.hasPermission("BAN_MEMBERS")) {
      return message.reply("Hey! You can't use that.");
    }
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
      return message.channel.send("I don't have the `Ban Members` permission in order to execute this command.");
    }

        const fetchBans = message.guild.fetchBans();
        const bannedMembers = (await fetchBans)
        .map ((member) => member.user.tag)
        .join(", ");
        const embed = new MessageEmbed()
        .setTitle(":hammer_pick: Banned users:")
        .setDescription(bannedMembers)
        .setColor("FF0000")
        .setTimestamp()

        message.channel.send(embed);
    },

};