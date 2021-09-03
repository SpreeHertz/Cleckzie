const { Client, Collection } = require("discord.js");
const { GiveawaysManager } = require('discord-giveaways');
const { Player } = require("discord-player");
const fs = require('fs');
const ms = require('ms');
const mongoCurrency = require('discord-mongo-currency');
require('dotenv').config()

const client = new Client({
    intents: 32767,
});
module.exports = client;

// Global Variables
client.config = require('./config.json')
client.commands = new Collection();
client.aliases = new Collection();
client.snipes = new Collection();
client.slashCommands = new Collection();
client.categories = fs.readdirSync("./commands/");

// Music
client.player = new Player(client);
client.filters = client.config.filters;
client.filters = client.filters;

const mongoose = require('mongoose')
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
const { VoiceManager } = require("discord-voice");
client.voiceManager = manager;

// Initializing the project
require("./handler")(client);

client.login(process.env.token);
