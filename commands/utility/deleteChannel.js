const Discord = require("discord.js");

module.exports = {
  name: "delete-channels",
  description:"Delete channels",
  aliases: ["del-channels", "del-channel", "delchannels", "delchannel", "delete-channel"],
  permissions: 'MANAGE_CHANNELS',
  usage: "<channelName>",

  run: async (client, message, args) => {
    const mal_ = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setColor("RED")
      .setTimestamp();

    const bien_ = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setColor("GREEN")
      .setTimestamp();

    const channel = args.join("-");

    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) {
      mal_.setDescription(
        "I don't have permissions to Manage Channels."
        
      )
      .setColor("#FF0000")
      return message.channel.send(mal_);
    }
     
      if(!message.member.hasPermission("MANAGE_CHANNELS")) {
         const bruh_ = new Discord.MessageEmbed()
         .setDescription("You don't have permissions to Manage Channels in order to run this command.")
         .setColor('#FF0000')
         return message.channel.send(bruh_)
     }

    if (!channel) {
      mal_.setDescription(
        "Put the name of a channel, also the channels with the same name will be deleted"
      );
      return message.channel.send(mal_);
    }

    let channels = message.guild.channels.cache.filter(
      r => r.name === `${channel}`
    );

    if (!channels.first()) {
      mal_.setDescription(
        "No channels found."
      );
      return message.channel.send(mal_);
    }

    await channels.forEach(channel => channel.delete());
        
    const listo = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
    .addField("Channel:", channel)
    .addField("Number of deleted channels:", `${channels.size} channels`)
    .setColor("GREEN")
    message.channel.send(listo)

  }
};
