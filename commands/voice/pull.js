const { Cilent, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: "pull",
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async (client, message, args) => {
        // Perms check
        if(!message.member.permissions.has("MANAGE_CHANNELS")) return;

        // If no member:
        const member = message.mentions.members.first();
        if (!member) {
            const bien_ = new MessageEmbed()
        .setDescription("**Please mention a member.**")
        .setColor("RED")
        return message.channel.send(bien_)
        }
        // If member mentioned is on a VC or not:
        if (!member.voice.channel) {
            const vc_ = new MessageEmbed()
            .setDescription("**The member you mentioned is not in a voice channel.**")
            .setColor("RED")
            return message.channel.send(vc_)
        }

        // If the user requesting the command is on a VC or not:
        if(!message.member.voice.channel) {
        const nmv_ = new MessageEmbed()
        .setDescription("Please **join** a voice channel first.")
        .setColor("RED")
        return message.channel.send(nmv_)
        }

        // Real function:
        member.voice.setChannel(message.member.voice.channel);
        const done_ = new MessageEmbed()
        .setDescription("I've pulled the member to your current voice channel.")
        return message.channel.send(done_)

    }
}
