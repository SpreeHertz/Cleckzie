// Require
const schema = require('./schema')
require('dotenv').config()
const fs = require('fs')
const ms = require('ms')
const mongoose = require('mongoose');
const mongoCurrency = require('discord-mongo-currency');
const { glob } = require('glob');
const { promisify } = require('util');

const globPromise = promisify(glob);
const { Collection, Client } = require('discord.js')
const client = new Client({ 
    intents: 32767, 
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

client.on("messageCreate", async (message) => {
    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(client.config.prefix)
    )
        return;

    const [cmd, ...args] = message.content
        .slice(client.config.prefix.length)
        .trim()
        .split(" ");

    const command = client.commands.get(cmd.toLowerCase());

    if (!command) return;
    await command.run(client, message, args);
});client.on("messageCreate", async (message) => {
    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(client.config.prefix)
    )
        return;

    const [cmd, ...args] = message.content
        .slice(client.config.prefix.length)
        .trim()
        .split(" ");

    const command = client.commands.get(cmd.toLowerCase());

    if (!command) return;
    await command.run(client, message, args);
});

client.on("interactionCreate", async (interaction) => {
    // Slash Command Handling
    if (interaction.isCommand()) {
        await interaction.defer({ ephemeral: false }).catch(() => {});

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({ content: "An error has occured " });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }

        cmd.run(client, interaction, args);
    }
});

client.login(process.env.token);
