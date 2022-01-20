const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const moment = require('moment');

module.exports = {
	...new SlashCommandBuilder()
		.setName("roleinfo")
		.setDescription("Returns useful information about a role")
		.addRoleOption((option) =>
			option
				.setName('role')
				.setDescription("What role you need information about")
				.setRequired(true),
		),
	/**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
	run: async (client, interaction) => {
		const role = interaction.options.getRole('role');
		const permissions = {
			"ADMINISTRATOR": "Administrator",
			"VIEW_AUDIT_LOG": "View Audit Log",
			"VIEW_GUILD_INSIGHTS": "View Server Insights",
			"MANAGE_GUILD": "Manage Server",
			"MANAGE_ROLES": "Manage Roles",
			"MANAGE_CHANNELS": "Manage Channels",
			"KICK_MEMBERS": "Kick Members",
			"BAN_MEMBERS": "Ban Members",
			"CREATE_INSTANT_INVITE": "Create Invite",
			"CHANGE_NICKNAME": "Change Nickname",
			"MANAGE_NICKNAMES": "Manage Nicknames",
			"MANAGE_EMOJIS": "Manage Emojis",
			"MANAGE_WEBHOOKS": "Manage Webhooks",
			"VIEW_CHANNEL": "Read Text Channels & See Voice Channels",
			"SEND_MESSAGES": "Send Messages",
			"SEND_TTS_MESSAGES": "Send TTS Messages",
			"MANAGE_MESSAGES": "Manage Messages",
			"EMBED_LINKS": "Embed Links",
			"ATTACH_FILES": "Attach Files",
			"READ_MESSAGE_HISTORY": "Read Message History",
			"MENTION_EVERYONE": "Mention @everyone, @here, and All Roles",
			"USE_EXTERNAL_EMOJIS": "Use External Emojis",
			"ADD_REACTIONS": "Add Reactions",
			"CONNECT": "Connect",
			"SPEAK": "Speak",
			"STREAM": "Video",
			"MUTE_MEMBERS": "Mute Members",
			"DEAFEN_MEMBERS": "Deafen Members",
			"MOVE_MEMBERS": "Move Members",
			"USE_VAD": "Use Voice Activity",
			"PRIORITY_SPEAKER": "Priority Speaker",
		};

		const yesno = {
			true: 'Yes',
			false: 'No',
		};


		const rolePermissions = role.permissions.toArray();
		const finalPermissions = [];
		for (const permission in permissions) {
			if (rolePermissions.includes(permission)) {finalPermissions.push(`${permissions[permission]}`);}
			else {
				// eslint-disable-next-line no-unused-vars
				const hm = '';
				// you might think that I'm retarded and I should've done a simple return statement, but the problem is that the bot gets stuck on thinking for some reason
			}
		}

		const position = `${interaction.guild.roles.cache.size - role.position}/${interaction.guild.roles.cache.size}`;

		const embed = new MessageEmbed()

			.setTitle(`${role.name}`)
			.setThumbnail(interaction.guild.iconURL({ dynamic: true, size: 1024 }))
			.addField('Name', `<@&${role.id}>`)
			.addField('ID', `${role.id}`)
			.addField('Position', `${position}`)
			.addField('Mentionable', yesno[role.mentionable])
			.addField('Bot Role', yesno[role.managed])
			.addField('Visible', yesno[role.hoist])
			.addField('Color', `${role.hexColor.toUpperCase()}`)
			.addField('Creation Date', `${moment(role.createdAt).format('DD MMM YYYY')}`)
			.addField('Permissions', `\n${finalPermissions.join(', ')}`)
			.setColor(role.hexColor);
		interaction.followUp({ embeds: [embed] });

	},
};