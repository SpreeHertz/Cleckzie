const { Client, Collection, MessageEmbed } = require("discord.js");
const Levels = require("discord-xp");
const chalk = require("chalk");
require('dotenv').config();
const { Manager } = require('erela.js');

// Note: 32767 means all intents.
const client = new Client({
	intents: 32767,
	disableMentions: 'everyone',
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

module.exports = client;

// discord-xp
try {
	Levels.setURL(process.env.database).then(console.log(chalk.grey('[info] -' + chalk.cyanBright(' Database successfully connected') + chalk.magentaBright(' for messages leveling.') + chalk.yellow(' (discord-xp)'))));
}
catch (err) {
	console.log(chalk.red('[error] - Something wrong happened while trying to connect to database for the discord-xp package.'));
}

client.on("messageCreate", async (message) => {
	if (!message.guild) return;
	if (message.author.bot) return;

	const randomAmountOfXp = Math.floor(Math.random() * 9) + 1;
	const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
	if (hasLeveledUp) {
		const user = await Levels.fetch(message.author.id, message.guild.id);
		message.channel.send({ content: `Congratulations ${message.author.username}, your level is now ${user.level}. :tada:` })
			.then(m => {
				setTimeout(() => {
					m.delete();
				},
				10000);
			});

	}
});


client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config/config.json");

[client.antiCrash ? "antiCrash" : null]
	.filter(Boolean)
	.forEach(h => {
		require(`./SlashCommands/${h}`)(client);
	});

require("./handler")(client);

// erela.js
client.manager = new Manager({
	nodes: [{
		host: process.env.lavalink_host,
		port: parseInt(process.env.lavalink_port),
		password: process.env.lavalink_pass,
	} ],

	send(id, payload) {
		const guild = client.guilds.cache.get(id);
		if (guild) guild.shard.send(payload);
	},
})
	.on("trackStart", (player, track) => {
		client.channels.cache
			.get(player.textChannel)
			.send(`Now playing: ${track.title}`);
	})
	.on("queueEnd", (player) => {
		client.channels.cache
			.get(player.textChannel)
			.send("Queue's over.");
		player.destroy();
	});

// nodeConnect
client.manager.on("nodeConnect", node => console.log(chalk.grey('[info] - ') + chalk.green(`All lavalink nodes connected. (${node.options.identifier})`)));

// nodeError
client.manager.on("nodeError", (node, error) => {
	console.log(chalk.red(`Node "${node.options.identifier}" encountered an error: ${error.message}.`));
});

// erela.js raw events
client.on("raw", d => client.manager.updateVoiceState(d));

client.login(process.env.token);
