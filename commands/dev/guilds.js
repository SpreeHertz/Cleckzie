const { MessageEmbed } = require('discord.js');
const chalk = require('chalk');

module.exports = {
	name: "bot-guilds",
	aliases: ['botguilds', 'top-guilds', 'topguilds'],
	/**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
	run: async (client, message) => {
		try {
			const guilds = client.guilds.cache
				.sort((a, b) => b.memberCount - a.memberCount)
				.first(15);

			const description = guilds.map((guild, index) => {
				return `${index + 1}) ${guild.name}: ${guild.memberCount} members`;
			}).join('\n');

			const embed = new MessageEmbed()
				.setTitle("Cleckzie's top Guilds")
				.setThumbnail("https://cdn.discordapp.com/avatars/790269534141284454/b15a9f7480d7a59380e82f3467fe84fa.webp?size=4096")
				.setColor("RANDOM")
				.setDescription(description || `None`);
			message.channel.send({ embeds: [embed] });
		}
		catch (error) {
			console.log(chalk.red(`An error had occured from guilds.js. Error: ${error}`));
			message.channel.send({ content: `${error}` });
		}
	},
};