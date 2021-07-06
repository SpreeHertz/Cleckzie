const { MessageEmbed } = require("discord.js")

module.exports = {
  name: 'stop',
  aliases: ['dc'],
  run: async (client, message, args) => {
    // Embed if the user isn't in a voice channel
    if (!message.member.voice.channel) {
      const userNotinVC_ = new MessageEmbed()
        .setDescription("Please join a voice channel first.")
        .setColor("#FF0000")
      return message.channel.send(userNotinVC_)
    }
    // Embed if the user isn't in the same voice channel
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
      const notInSameVC_ = new MessageEmbed()
        .setDescription("You're not in the same channel as me.")
        .setColor("#FF0000")
      return message.channel.send(notInSameVC_)
    }

    const queue = client.player.getQueue(message);

    // If no music is currently playing
    if (!client.player.getQueue(message)) {
      const noMusicCurrentlyPlaying = new MessageEmbed()
        .setDescription("No song(s) are currently playing.")
        .setColor("#FF0000")
      return message.channel.send(noMusicCurrentlyPlaying)
    }
    client.player.setRepeatMode(message, false);
    const success = client.player.stop(message);

    if (success) {
      const stoppedPlaying = new MessageEmbed()
        .setAuthor(message.guild.name, message.guild.displayIconURL({ dynamic: true }))
        .setDescription(`${client.config.emojis.success} Music has been **stopped** in this server.`)
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
      return message.channel.send(stoppedPlaying)
    }
  },
};