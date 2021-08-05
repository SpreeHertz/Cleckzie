const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "say",
  category: "messages",
  description: "Repeats what the user says after the command.",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const sayEmbed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dyanmic: true }))
        .setDescription(args.join(" "))
        .setTimestamp()
        .setColor("RANDOM")
        await message.delete()

    message.channel.send({embeds: [embed]})
  }
};