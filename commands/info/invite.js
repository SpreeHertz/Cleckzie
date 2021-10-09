const { Cilent, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: "invite",
    aliases: ['inv', 'links'],
    description: "Gives you an link to invite Cleckzie to your server.",
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setTitle("Cleckzie")
        .addField("GitHub Repository (source code)", "[Click here](https://github.com/spreehertz/cleckzie)")
        .addField("Twitter", "[Click here](https://twitter.com/cleckzie)")
        .addField("Invite link", "[Click here](https://dsc.gg/cleckzie)")
        .addField("Documentation (in development)", "[Click here](https://spreehertz.gitbook.io/cleckzie/)")
        .setColor("GREEN")
        .setURL("https://discord.com/api/oauth2/authorize?client_id=790269534141284454&permissions=8&scope=bot")
        .setThumbnail("https://cdn.discordapp.com/attachments/823804495200256012/826107147027873852/cleckzie_logo.jpg")
        .setTimestamp()

        message.channel.send(embed);
    }
}