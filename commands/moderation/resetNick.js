const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "reset-nickname",
  category: "moderation",
  aliases: ['nicknamereset'],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const member = message.mentions.members.first();

    if (!member) return message.reply("Please specify a member!");

    try {
      member.setNickname(null);
      await message.reply(`${member}'s nickname has been reset.`)
    } catch (err) {
      message.reply(
        "I do not have permission to reset " + member.toString() + " nickname!"
      );
    }
  },
};