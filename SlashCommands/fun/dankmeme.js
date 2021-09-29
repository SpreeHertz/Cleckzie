const got = require('got');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name : 'dankmeme',
	description: "Memes from r/dankmemes",
	run: async (message, interaction) => {
		got('https://www.reddit.com/r/dankmemes/random/.json').then(res => {
			const content = JSON.parse(res.body);
			interaction.channel.send(
				new MessageEmbed()
					.setTitle(content[0].data.children[0].data.title)
					.setImage(content[0].data.children[0].data.url)
					.setColor("RANDOM")
					.setFooter(`👍 ${content[0].data.children[0].data.ups} 👎 ${content[0].data.children[0].data.downs} | Comments: ${content[0].data.children[0].data.num_comments}`),
			);
		});
	},
};