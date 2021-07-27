const { Cilent, Message, MessageEmbed, TeamMember } = require('discord.js');

module.exports = {
    name: "create-channel",
    aliases: ['create'],
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async (client, message, args) => {
        // embed sent if no perms:
        if (!message.member.permissions.has("MANAGE_CHANNELS")) {
            const bien_ = new MessageEmbed()
            .setDescription("You don't have the **Manage Channels** permission in order to run this command.")
            .setColor("#FF0000")
            return message.channel.send(bien_)
        }

            const channelNameQuery = args.join(" ");
            // embed sent if no name is specified:
            if (!channelNameQuery) {
                const ncnq_ = new MessageEmbed()
                .setDescription("Please specify a channel name.")
                .setColor("#FF0000")
                return message.channel.send(ncnq_)
            }
            // after
            message.guild.channels.create(channelNameQuery)
            .then(ch => {
              const done_ = new MessageEmbed()
              .setDescription(`Click on ${ch} to see the newly created channel!`)
              .setColor("#00FF00")
              return message.channel.send(done_)
            })
        }

    }
