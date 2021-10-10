/* eslint-disable no-unused-vars */
const { MessageEmbed, CommandInteraction, MessageAttachment } = require('discord.js');
const voiceClient = require('../../Client/voiceClient');
const Levels = require('discord-xp');
const canvacord = require('canvacord');

module.exports = {
	name: 'rank',
	description: 'Shows rank info of a user (messages/voice-time)',
	options: [
		{
			name: 'messages',
			description: 'Shows XP for a user (messages)',
			type: 'USER',
			required: false,
		},
		{
			name: 'voice',
			description: 'Shows voice-time for a user',
			type: 'NUMBER',
			required: false,
		},
	],
	/**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
	run: async (client, interaction, args, message) => {
		const fetchGuild = interaction.guild;
		// messages (discord-xp)
		// Rank
		const target = interaction.options.getUser('messages');
		const user = await Levels.fetch(target.id, fetchGuild.id);
		const neededXp = Levels.xpFor(parseInt(user.level) + 1);

		// If the user mentioned/message.author has no XP:
		if (!user) {
			const noUserMessages = new MessageEmbed()
				.setDescription(`:x: Seems like the user has **no XP** so far in terms of messages.`)
				.setColor("#FF0000");
			return interaction.followUp({ embeds: [noUserMessages] });
		}

		// Rank Card
		const rank = new canvacord.Rank()
			.setAvatar(target.displayAvatarURL({ dynamic: false, format: 'png' }))
			.setCurrentXP(user.xp)
			.setRequiredXP(neededXp)
			.setLevel(user.level)
			.setStatus("online")
			.setProgressBar("#F69699")
			.setBackground("IMAGE", "https://cdn.discordapp.com/attachments/790289078985818112/835892079572811837/rankcard_background.png")
			.setUsername(target.username)
			.setDiscriminator(target.discriminator, "#00ff6a");
		rank.build()
			.then(data => {
				const attachment = new MessageAttachment(data, 'rankcard.png');
				// embed to be sent
				const finalEmbed = new MessageEmbed()
					.setAuthor(target.username, target.avatarURL({ dynamic: true }))
					.addField('Current XP', `${user.xp}`)
					.addField('XP Needed', `${neededXp}`)
					.addField(`${target.username}'s Level`, `${user.level}`)
					.setColor('RANDOM')
					.setImage(attachment);
				interaction.followUp({ embeds: [finalEmbed] });
			});
	},

};