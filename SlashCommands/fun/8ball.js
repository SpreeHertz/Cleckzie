/* eslint-disable no-unused-vars */
const { Discord, CommandInteraction, MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	...new SlashCommandBuilder()
		.setName("8ball")
		.setDescription("Play 8ball with Cleckzie")
		.addStringOption((option) =>
			option
				.setName("question")
				.setDescription("What your question is")
				.setRequired(true),
		),
	run: async (message, args, interaction) => {
		const answers = [
			'It is certain.',
			'It is decidedly so.',
			'Without a doubt.',
			'Yes - definitely.',
			'You may rely on it.',
			'As I see it, yes.',
			'Most likely.',
			'Outlook good.',
			'Yes.',
			'Signs point to yes.',
			'Reply hazy, try again.',
			'Ask again later.',
			'Better not tell you now.',
			'Cannot predict now.',
			'Concentrate and ask again.',
			'Don\'t count on it.',
			'My reply is no.',
			'My sources say no.',
			'Outlook not so good.',
			'Very doubtful.',
		];
		const question = args.join(' ');
		const embed = new MessageEmbed()
			.setTitle('🎱  The Magic 8-Ball  🎱')
			.addField('Question', question)
			.addField('Answer', `${answers[Math.floor(Math.random() * answers.length)]}`)
			.setColor('RANDOM');
		interaction.followUp({ embeds: [embed] });

	},

};