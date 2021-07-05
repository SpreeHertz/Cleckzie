// Require
const schema = require('./schema')
require('dotenv').config()
const {Collection, Client, Discord, MessageEmbed} = require('discord.js')
const fs = require('fs')
const client = new Client({ disableEveryone: true })
const ms = require('ms')
require('discord-buttons')(client);

const config = require('./config/bot')
const filters = config.filters;
const prefix = config.discord.prefix;
const token = config.discord.token;
const emotes = config.emojis;
client.commands = new Collection();
client.aliases = new Collection();
client.snipes = new Collection();

module.exports = client;
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
    const Timeout = new Collection();
}); 

// MongoDB Credentials

 const mongoose = require('mongoose');
mongoose.connect(process.env.database, {
    useUnifiedTopology : true,
    useNewUrlParser: true,
}).then(console.log('Connected to MongoDB.'))


// AFK Command
const db = require('quick.db')
client.on('message', async message => {
if(message.author.bot) return;

if(db.has(`afk-${message.author.id}+${message.guild.id}`)) {
        const info = db.get(`afk-${message.author.id}+${message.guild.id}`)
        await db.delete(`afk-${message.author.id}+${message.guild.id}`)
        message.reply(`Your AFK status have been removed.`)}

    if(message.mentions.members.first()) {
        if(db.has(`afk-${message.mentions.members.first().id}+${message.guild.id}`)) {
            message.channel.send(message.mentions.members.first().user.tag + " is AFK. \nReason: " + db.get(`afk-${message.mentions.members.first().id}+${message.guild.id}`))
        }else return;
    }else;

    // Other 
    const Timeout = new Collection();
    if(!message.content.startsWith(prefix)) return;
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0 ) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(command) command.run(client, message, args) 
})

// Mention Message
client.on('message', async message => {
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
})


    
// Giveaways
const { GiveawaysManager } = require('discord-giveaways');
const manager = new GiveawaysManager(client, {
    storage: './storages/giveaways.json',
    updateCountdownEvery: 10000,
    hasGuildMembersIntent: false,
    default: {
        botsCanWin: false,
        exemptPermissions: ['MANAGE_MESSAGES', 'ADMINISTRATOR'],
        embedColor: '#FF0000',
        reaction: '🎉'
    }
});
client.giveawaysManager = manager;

// Giveaways Console Logging

client.giveawaysManager.on("giveawayReactionAdded", (giveaway, member, reaction) => {
    console.log(`${member.user.tag} entered giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
});

client.giveawaysManager.on("giveawayReactionRemoved", (giveaway, member, reaction) => {
    console.log(`${member.user.tag} unreact to giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
});

client.giveawaysManager.on("giveawayEnded", (giveaway, winners) => {
    console.log(`Giveaway #${giveaway.messageID} ended! Winners: ${winners.map((member) => member.user.username).join(', ')}`);
});

// Discord Voice
const DiscordVoice = require("discord-voice");
const Voice = new DiscordVoice(client, process.env.database)
client.discordVoice = Voice;
client.on('ready', async () => {
    await client.discordVoice.start();
});


// Leveling System

const Levels = require("discord-xp");

Levels.setURL(process.env.database);
client.on("message", async (message) => {
    if (!message.guild) return;
    if (message.author.bot) return;
    
    const randomAmountOfXp = Math.floor(Math.random() * 9) + 1; // Min 1, Max 30
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
    if (hasLeveledUp) {
      const user = await Levels.fetch(message.author.id, message.guild.id);
      message.channel.send(`Congratulations ${message.author.username}, your level is now ${user.level}. :tada:`)
      .then(message => message.delete ({ timeout: 2000 }))
      
    }
  });

  // Music
const { Player } = require("discord-player");
client.player = new Player(client);
client.filters = client.filters;

const player = fs.readdirSync('./player').filter(file => file.endsWith('.js'));

for (const file of player) {
    console.log(`Loading discord-player event ${file}`);
    const event = require(`./player/${file}`);
    client.player.on(file.split(".")[0], event.bind(null, client));
};

// Economy
const mongoCurrency = require('discord-mongo-currency');
 
mongoCurrency.connect(process.env.database);


client.login(process.env.token);
