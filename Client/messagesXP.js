const client = require('../index');
const Levels = require("discord-xp");
const chalk = require("chalk");

Levels.setURL(process.env.database).then(console.log(chalk.grey('[info] -' + chalk.cyanBright(' Database successfully connected') + chalk.magentaBright(' for messages leveling.') + chalk.yellow(' (discord-xp)'))));
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
