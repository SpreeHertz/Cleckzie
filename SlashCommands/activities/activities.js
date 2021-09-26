/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
const { MessageEmbed, Invite, User } = require('discord.js');
const fetch = require('node-fetch');
const chalk = require('chalk');


module.exports = {
	name: 'activities',
	description: 'Collection of mini-game for voice channels!',
	options: [
		{
			name: 'mini-games',
			description: 'Choose the mini-game',
			type: 'STRING',
			required: true,
			choices: [
				{
					name: 'betrayal.io',
					value: '773336526917861400',
				},
				{
					name: 'chess-in-the-park',
					value: '832012774040141894',
				},
				{
					name: 'chess-in-the-park-development',
					value: '832012586023256104',
				},
				{
					name: 'fishington.io',
					value: '814288819477020702',
				},
				{
					name: 'poker-night',
					value: '755827207812677713',
				},
				{
					name: 'youtube-together',
					value: '755600276941176913',
				},
			],
		},
	],
	run: async (client, interaction) => {

		const ApplicationId = interaction.options.getString('mini-games');

		const channel = interaction.member.voice.channel;

		if (!channel) {
			return interaction.followUp({
				embeds: [
					new MessageEmbed()
						.setTitle('**Discord Activites**')
						.setDescription('Please join a voice channel before using this command!')
						.setColor('#ff0000')
						.setFooter('This message will disappear in 10 seconds!')
						.setTimestamp(),
				],
			}).then(m => {
				setTimeout(() => {
					m.delete();
				}, 10000);
			});
		}


		fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
			method: 'POST',
			body: JSON.stringify({
				max_age: 86400,
				max_uses: 0,
				target_application_id: `${ApplicationId}`,
				target_type: 2,
				temporary: false,
				validate: null,
			}),
			headers: {
				"Authorization": `Bot ${client.token}`,
				"Content-Type": "application/json",
			},
		}).then(res => res.json())
			.then(invite => {
				if (!invite.code) {
					return interaction.followUp({
						embeds: [
							new MessageEmbed()
								.setTitle('**Discord-Activities**')
								.setDescription('Unable to start activities please try again!')
								.setColor('#ff0000')
								.setTimestamp()
								.setFooter('This message will disappear in 10 seconds.'),
						],
					}).then(m => {
						setTimeout(() => {
							m.delete();
						}, 10000);
					});
				}
				interaction.followUp({
					embeds: [
						new MessageEmbed()
							.setDescription('Click on the link below to start your session <3')
							.setTimestamp()
							.setColor('#ffff00'),
					],
				}).then(m => {
					interaction.channel.send({
						content: `https://discord.com/invite/${invite.code}`,

					}).then(console.log(chalk.yellow('[Info]') + chalk.cyan(` ${interaction.user.username}`) + chalk.green(' executed') + chalk.cyan(' SlashCommands/activities.js') + chalk.green(' in the channel') + chalk.cyan(` #${interaction.channel.name}`) + chalk.green(' on the guild') + chalk.cyan(` ${interaction.guild}.`) + chalk.green(' Choice chosen:') + chalk.cyan(` ${ApplicationId}`)));
				});
			});
	},
};