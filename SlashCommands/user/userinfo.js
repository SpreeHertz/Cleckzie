const { MessageEmbed } = require('discord.js');

module.exports = {
	name: "userinfo",
	description: "Get info about a user",
	options: [
		{
			name: 'target',
			description: "Who's userinfo to fetch",
			type: 'USER',
			required: false,
		},
	],
	run: async (client, interaction) => {
		// Fetching the user
		const target = interaction.options.getUser('target');

		// Defining flags
		const flags = {
			DISCORD_EMPLOYEE: 'Discord Employee',
			DISCORD_PARTNER: 'Discord Partner',
			BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
			BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
			HYPESQUAD_EVENTS: 'HypeSquad Events',
			HOUSE_BRAVERY: 'House of Bravery',
			HOUSE_BRILLIANCE: 'House of Brilliance',
			HOUSE_BALANCE: 'House of Balance',
			EARLY_SUPPORTER: 'Early Supporter',
			TEAM_USER: 'Team User',
			SYSTEM: 'System',
			VERIFIED_BOT: 'Verified Bot',
			VERIFIED_DEVELOPER: 'Verified Bot Developer',
		};
		function trimArray(arr, maxLen = 25) {
			if (Array.from(arr.values()).length > maxLen) {
				const len = Array.from(arr.values()).length - maxLen;
				arr = Array.from(arr.values()).sort((a, b) => b.rawPosition - a.rawPosition).slice(0, maxLen);
				arr.map(role => `<@&${role.id}>`);
				arr.push(`${len} more...`);
			}
			return arr.join(", ");
		}
		const statuses = {
			"online" : "🟢",
			"idle" : "🟠",
			"dnd" : "🔴",
			"offline" : "⚫️",
		};

		if (target) {
			const targetEmbed = new MessageEmbed()
				.setTitle(`${target.user.username}'s userinfo'`)
				.addField(`Username`, `${target.user.username}`);
			return interaction.followUp({ embeds: [targetEmbed] });
		}
	},
};