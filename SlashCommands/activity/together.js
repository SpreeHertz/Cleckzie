/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
	name: 'activity',
	description: 'Play discord activities (Youtube, Poker, Fishington, Chess)',
	options: [{
		name: 'channel',
		type: 'CHANNEL',
		description: 'Channel to use the activity',
		required: true,
	},
	{
		name: 'activity',
		type: 'STRING',
		description: 'The activity you wanna use',
		required: true,
		choices: [{
			name: 'youtube',
			value: 'youtube',
		},
		{
			name: 'poker',
			value: 'poker',
		},
		{
			name: 'fishington',
			value: 'fishington',
		},
		{
			name: 'betrayal',
			value: 'betrayal',
		},
		{
			name: 'chess',
			value: 'chess',
		},
		],
	},
	],
	run: async (client, interaction, options) => {
		const channel = client.channels.cache.get(options[0].value);

		if (channel.type !== 'GUILD_VOICE') {
			return interaction.followUp('The chosen channel must be a voice channel ').catch(console.error);
		}
		if (options[1].value === 'youtube') {
			client.discordTogether.createTogetherCode(channel.id, 'youtube').then(async invite => {
				return interaction.followUp(`[**Click here to join YouTube Together**](${invite.code} "Join YouTube Together")`);
			});
		}
		else if (options[1].value === 'poker') {
			client.discordTogether.createTogetherCode(channel.id, 'poker').then(async invite => {
				return interaction.followUp(`[**Click here to join Poker Night**](${invite.code} "Join Poker Night")`);
			});
		}
		else if (options[1].value === 'fishington') {
			client.discordTogether.createTogetherCode(channel.id, 'fishing').then(async invite => {
				return interaction.followUp(`[**Click here to join Fishington.io**](${invite.code} "Join fishington.io")`);
			});
		}
		else if (options[1].value === 'betrayal') {
			client.discordTogether.createTogetherCode(channel.id, 'betrayal').then(async invite => {
				return interaction.followUp(`[**Click here to join Betrayal.io**](${invite.code} "Join betrayal.io")`);
			});
		}
		else if (options[1].value === 'chess') {
			client.discordTogether.createTogetherCode(channel.id, 'chess').then(async invite => {
				return interaction.followUp(`[**Click here to join Chess**](${invite.code} "Join A game of Chess")`);
			});
		}
	},
};