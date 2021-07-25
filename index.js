// Require
const schema = require('./schema')
require('dotenv').config()
const fs = require('fs')
const ms = require('ms')
const mongoose = require('mongoose');
const mongoCurrency = require('discord-mongo-currency');
const { Collection, Client } = require('discord.js')
const client = new Client({
    intents: [
        "GUILDS",
        "GUILD_MEMBERS",
        "GUILD_BANS",
        "GUILD_EMOJIS",
        "GUILD_INTEGRATIONS",
        "GUILD_WEBHOOKS",
        "GUILD_INVITES",
        "GUILD_VOICE_STATES",
        "GUILD_PRESENCES",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
        "GUILD_MESSAGE_TYPING",
        "DIRECT_MESSAGES",
        "DIRECT_MESSAGE_REACTIONS",
        "DIRECT_MESSAGE_TYPING",
    ],
});
const { GiveawaysManager } = require('discord-giveaways');
const DiscordVoice = require("discord-voice");
const { Player } = require("discord-player");

client.config = require('./config/bot')
client.commands = new Collection();
client.aliases = new Collection();
client.snipes = new Collection();
client.slashCommands = new Collection();
client.categories = fs.readdirSync("./commands/");

// Music
client.player = new Player(client);
client.filters = client.config.filters;
client.filters = client.filters;


// MongoDB Credentials

mongoose.connect(process.env.database, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(console.log('Connected to MongoDB.'))

//Economy
mongoCurrency.connect(process.env.database);


// Giveaways
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
const Voice = new DiscordVoice(client, process.env.database)
client.discordVoice = Voice;

["command", "player", "event"].forEach(x => require(`./handlers/${x}`)(client));


client.login(process.env.token);