const { EmbedBuilder } = require('discord.js');
module.exports = {
	name: 'stats',
	description: "Check bot's statistics.",
	cooldown: 3000,
	userPerms: [],
	botPerms: [],
	run: async (client, message, args) => {
		const embed = new EmbedBuilder()
		.setColor(0x0099ff)
		.setAuthor({ name: 'Cleckzie Stats', iconURL: 'https://images-ext-1.discordapp.net/external/Hxak5GJhqFCxuIVhKtiFcFTPLmV5YArXqZfICSME59k/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/790269534141284454/e336d7bdfca45aa82359ed7b03d48dd9.png?format=webp&quality=lossless&width=960&height=960', })
		.addFields(
			{ name: 'Users', value: `${client.users.cache.size} users` },
			{ name: 'Servers', value: `${client.guilds.cache.size} servers` },
		)
	message.reply({ embeds: [embed] });
		
	}
};