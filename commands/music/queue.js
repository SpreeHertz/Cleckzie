const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'queue',
  aliases: ['q'],

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
      const queueEmbed = new MessageEmbed()
      .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
      .setTitle("Server Queue")
      .addField("Current Track", `${queue.playing.title} | ${queue.playing.author}`)
      .setColor('RANDOM')
      .addField("Tracks", queue.tracks.map((track, i ) => { return `**#${i + 1}** - ${track.title} | ${track.author}(Requested by: ${track.requestedBy.username})`}).slice(0, 5).join('\n') + `\n\n${queue.tracks.length > 5 ? `And **${queue.tracks.length - 5}** other songs...` : `In the playlist **${queue.tracks.length}** song(s)...`}`)
      return message.channel.send(queueEmbed)
      
  },
};