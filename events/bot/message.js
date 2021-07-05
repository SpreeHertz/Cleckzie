const db = require('quick.db')
const Levels = require("discord-xp");
const { chatBot } = require("reconlx");
const Schema = require("../../models/chatbot-channel")
const { MessageEmbed } = require('discord.js')
module.exports = async (client, message) => {
    if (message.author.client) return;
    if (!message.guild) return;

    if (db.has(`afk-${message.author.id}+${message.guild.id}`)) {
        const info = db.get(`afk-${message.author.id}+${message.guild.id}`)
        await db.delete(`afk-${message.author.id}+${message.guild.id}`)
        message.reply(`Your AFK status have been removed.`)
    }

    if (message.mentions.members.first()) {
        if (db.has(`afk-${message.mentions.members.first().id}+${message.guild.id}`)) {
            message.channel.send(message.mentions.members.first().user.tag + " is AFK. \nReason: " + db.get(`afk-${message.mentions.members.first().id}+${message.guild.id}`))
        } else return;
    } else;

    if (message.content === `<@${client.user.id}>` || message.content === `<@!${client.user.id}>`) {
        const roleColor =
            message.guild.me.displayHexColor === "#000000"
                ? "#ffffff"
                : message.guild.me.displayHexColor
        const embed = new MessageEmbed()
            .setTitle('Hi, I\'m Cleckzie.')
            .setDescription(`My prefix is \`${prefix}\` in **${message.guild.name}**. \n
          Do \`${prefix}help\`to see all my commands.`)
            .setColor(roleColor)
        message.channel.send(embed);
    }

    if (message.content === '*lb' || message.content === '*leaderboard') {
        const choose_ = new MessageEmbed()
            .setTitle("🏅 Leaderboard")
            .setDescription("Please execute one of these commands below:")
            .addField("Message Leaderboard", `\`*lb-messages\``, true)
            .addField("Voice Leaderboard", `\`*lb-voice\``, true)
            .setColor("RANDOM")
        return message.channel.send(choose_)
    }

    Levels.setURL(process.env.database);
    const randomAmountOfXp = Math.floor(Math.random() * 9) + 1; // Min 1, Max 30
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
    if (hasLeveledUp) {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        message.channel.send(`Congratulations ${message.author.username}, your level is now ${user.level}. :tada:`)
            .then(message => message.delete({ timeout: 2000 }))

    }

    Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
        if (!data) return;
        if (message.channel.id !== data.Channel) return;
        chatBot(message, message.content, message.author.id);
    })

    // Other 
    const Timeout = new Collection();
    if (!message.content.startsWith(prefix)) return;
    if (!message.guild) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length == 0) return;
    let command = client.commands.get(cmd)
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) command.run(client, message, args)

}