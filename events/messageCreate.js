const client = require("../index");
const prefix = require('../config/config.json').bot.prefix;


client.on("messageCreate", async (message) => {
	if (
		message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(prefix)
	) {return;}

	const [cmd, ...args] = message.content
		.slice(prefix.length)
		.trim()
		.split(" ");

	const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

	if (!command) return;
	await command.run(client, message, args);
});
