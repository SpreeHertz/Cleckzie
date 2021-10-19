const { MessageEmbed } = require('discord.js');


module.exports = {
	name: 'panik',
	description: 'Generates a panik meme',
	options: [
		{
			name: 'panik-1',
			description: 'Text to be shown on the first panik',
			type: 'STRING',
			required: true,
		},
		{
			name: 'kalm',
			description: 'Text to be shown on kalm',
			type: 'STRING',
			required: true,
		},
		{
			name: 'panik-2',
			description: 'Text to be shown on the second panik',
			type: 'STRING',
			required: true,
		},
	],
	run: async (args, interaction) => {
		const firstPanik = interaction.options.getString('panik-1');
		const kalm = interaction.options.getString('kalm');
		const secondPanik = interaction.options.getString('panik-2');
		try {
			const embed = new MessageEmbed()
				.setDescription('Panik meme successfully generated!')
				.setColor('RANDOM')
				.setImage(`https://api.leoapi.xyz/image/panik-kalm?panik1=%20${firstPanik}%20&kalm=%20${kalm}%20&panik2=%20${secondPanik}%20`);
			interaction.followUp({ embeds: [embed] });
		}
		catch (error) {
			return console.log(error);

		}
	},

};