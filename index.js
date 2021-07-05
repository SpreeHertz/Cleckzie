// Require
const schema = require('./schema')
require('dotenv').config()
const fs = require('fs')
const ms = require('ms')
const mongoose = require('mongoose');
const mongoCurrency = require('discord-mongo-currency');
const { Collection, Client } = require('discord.js')
const client = new Client({ disableEveryone: true })
const { GiveawaysManager } = require('discord-giveaways');
const DiscordVoice = require("discord-voice");
const { Player } = require("discord-player");
require('discord-buttons')(client);

client.config = require('./config/bot')
client.commands = new Collection();
client.aliases = new Collection();
client.snipes = new Collection();


client.categories = fs.readdirSync("./commands/");
["command", "event", "player"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

// MongoDB Credentials

mongoose.connect(process.env.database, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(console.log('Connected to MongoDB.'))


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

// Music
client.player = new Player(client);
client.filters = client.config.filters;
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