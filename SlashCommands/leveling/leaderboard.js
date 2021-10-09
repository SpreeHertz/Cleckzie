/* eslint-disable no-unused-vars */
const { MessageEmbed, CommandInteraction } = require('discord.js');
const voiceClient = require('../../Client/voiceClient');
const Levels = require('discord-xp');

module.exports = {
	name: 'leaderboard',
	description: 'Show the leaderboard (messages/voice-time)',
	options: [
		{
			name: 'top-messages',
			description: 'Shows the messges leaderboard',
			type: 'NUMBER',
			required: false,
		},
		{
			name: 'top-voice',
			description: 'Shows the voice-time leaderboard',
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
		const Guild = interaction.guild;
		// Messages part (discord-xp)
		// Fetching the leaderboard number specified by the user
		const leaderboardInt = interaction.options.getNumber('top-messages');

		// Fetching the Leaderboard and specifying the number of people that should be shown in the leaderboard (fetched above)
		const rawLeaderboard = await Levels.fetchLeaderboard(Guild, leaderboardInt || 10);

		// If no one's in leaderboard:
		if (rawLeaderboard.length < 1) {
			const noUsers = new MessageEmbed()
				.setDescription("No one's in leaderboard yet.")
				.setColor("#FF0000");
			return interaction.followUp({ embeds: [noUsers] });
		}

		// If leaderboardInteger is too high
		if (leaderboardInt > 20) {
			return interaction.followUp({ content: 'The bot can\'t fetch more than 20 users\' leaderboard. Please try a lower number.' });
		}
		// Computing the leaderboard
		const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true);

		// Mapping the leaderboard
		const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: **${e.level}**\nXP: **\`${e.xp.toLocaleString()}\`**\n`);
		// Constructing the embed to be sent in the channel after the mapping is done
		const computedLeaderboard = new MessageEmbed()

			.setAuthor(Guild.name, Guild.iconURL({ dynamic: true }))
			.setTitle("Messages Leaderboard")
			.setDescription(lb, lb.join("\n\n"))
			.setColor('DARK_BUT_NOT_BLACK');
		interaction.followUp({ embeds: [computedLeaderboard] });

		// voice-leaderboard
		const fetchNumber = interaction.options.getNumber('top-voice');
		if (fetchNumber > 30) return interaction.followUp({ content: `The bot cannot fetch more than 30 users' leaderboard. Please try a lower number.`, ephemeral: true });
		const embed = await voiceClient.generateLeaderboard({
			message: message,
			top: fetchNumber || 10,
			guild: Guild,
			color: 'RANDOM',
		});
		interaction.followUp({ embeds: [embed] });
	},

};