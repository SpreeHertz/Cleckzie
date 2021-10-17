/* eslint-disable no-undef */
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
	name: "info",
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
		// Userinfo
		const target = interaction.options.getMember('target');
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

		const userFlags = Array().fill(target.flags);
		const activity = target.presence?.activities[0];
		const statuses = {
			"online" : "🟢",
			"idle" : "🟠",
			"dnd" : "🔴",
			"offline" : "⚫️",
		};

		const devicesFunction = () => {
			const embedDevices = Object.entries(devices)
				.map((value, index) => `${index + 1}) ${value[0][0].toUpperCase()}${value[0].slice[1]}`)
				.join(",");
			`${entries}`;


			// trimArray
			function trimArray(arr, maxLen = 25) {
				if (Array.from(arr.values()).length > maxLen) {
					const len = Array.from(arr.values()).length - maxLen;
					arr = Array.from(arr.values()).sort((a, b) => b.rawPosition - a.rawPosition).slice(0, maxLen);
					arr.map(role => `<@&${role.id}>`);
					arr.push(`${len} more...`);
				}
				return arr.join(", ");
			}
			// activity
			let userstatus = "Not having an activity";
			if (activity) {
				if (activity.type === "CUSTOM_STATUS") {
					const emoji = `${activity.emoji ? activity.emoji.id ? `<${activity.emoji.animated ? "a" : ""}:${activity.emoji.name}:${activity.emoji.id}>` : activity.emoji.name : ""}`;
					userstatus = `${emoji} \`${activity.state || 'Not having an acitivty.'}\``;
				}
				else {
					userstatus = `${activity.type.toLowerCase().charAt(0).toUpperCase() + activity.type.toLowerCase().slice(1)} ${activity.name}`;
				}
			}

			if (target) {
			// embed to be sent if the target exists
				const targetEmbed = new MessageEmbed()
					.setTitle(`${target.user.username}'s userinfo`)
					.addField(`Username`, `${target.user.username}`)
					.addField(`Nickname`, `${target.nickname || 'No nickname'}`)
					.addField(`Avatar`, `[Link to avatar](${target.avatarURL})`)
					.addField(`Joined Discord on`, moment(target.createdTimestamp).format("DD/MM/YYYY") + ", " + moment(target.createdTimestamp).format("hh:mm:ss"))
					.addField(`Joined this guild on`, moment(target.joinedTimestamp).format("DD/MM/YYYY") + ", " + moment(target.joinedTimestamp).format("hh:mm:ss"))
					.addField(`Flags/Badges`, `${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`)
					.addField('Status', `${statuses[target.presence?.status]} ${target.presence?.status}`)
					.addField(`Activity`, `${userstatus}`)
					.addField(`Permissions`, `${target.permissions?.toArray().map(p => `\`${p}\``).join(", ")}`)
					.addField(`Device(s)`, `${Object.entries(devices)}`)
					.setColor('RANDOM')
					.setFooter(`Requested by ${interaction.user.username}`, interaction.user.displayAvatarURL({ dynamic: true }));

				return interaction.followUp({ embeds: [targetEmbed] });
			}
		};
	},
};