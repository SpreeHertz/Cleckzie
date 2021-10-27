const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const chalk = require('chalk');

module.exports = {
	name: 'kick',
	description: 'Kick a member from the server',
	options: [
		{
			name: 'user',
			description: 'Whom to ban',
			required: true,
			type: 'USER',
		},
		{
			name: 'reason',
			description: 'Reason for this kick',
			required: false,
			type: 'STRING',
		},
	],
	/**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
	run: async (client, interaction) => {
		// Fetch the user to kick
		const kickMember = interaction.options.getMember('user');
		// Fetch the reason
		let reason = interaction.options.getString('reason');
		if (!reason) reason = 'No reason provided.';


		// Embeds
		const noMemberPerms = new MessageEmbed()
			.setDescription(`You don't have permission to do this.`)
			.setColor(client.colors.error)
			.setTimestamp()
			.setFooter(`${interaction.member.tag}`, interaction.member.avatarURL({ dynamic: true }));

		const bothasNoPerms = new MessageEmbed()
			.setDescription('I don\'t have permission to do this.')
			.addField('Permission Required:', '`Kick Members`')
			.setTimestamp()
			.setColor(client.colors.error);

		const roleHierarchy = new MessageEmbed()
			.setDescription(`You're not high enough in the role hierarchy to do that.`)
			.setTimestamp()
			.setColor(client.colors.error)
			.setFooter(`${interaction.member}`, interaction.member.avatarURL({ dynamic: true }));

		const botRoleHierarchy = new MessageEmbed()
			.setDescription(`I'm not high enough in the role hierarchy to do that.`)
			.addField('Possible Fix:', `Drag my role above the user who you want to kick.`)
			.setColor(client.colors.error)
			.setTimestamp();

		const successfullyKicked = new MessageEmbed()
			.setDescription(`${interaction.member} **successfully kicked** ${kickMember.user.username}.`)
			.addField(`Reason`, `${reason}`)
			.setColor('RANDOM')
			.setTimestamp();

		const promptFailed = new MessageEmbed()
			.setDescription(`Got it, not kicking that user.`)
			.setColor(client.colors.error)
			.setTimestamp()
			.setFooter(`${interaction.member.tag}`, interaction.member.avatarURL({ dynamic: true }));

		// Buttons
		// Error Buttons
		const errorButtons = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('issue')
				.setLabel('Submit an issue')
				.setStyle('LINK')
				.setURL('https://github.com/SpreeHertz/Cleckzie/issues'),
			new MessageButton()
				.setCustomId('pull-request')
				.setLabel('Submit a Pull Request')
				.setStyle('LINK')
				.setURL('https://github.com/SpreeHertz/Cleckzie/pulls'),
		);
		// If statements to prevent errors and abuse
		if (!interaction.member.permissions.has('KICK_MEMBERS')) return interaction.followUp({ embeds: [noMemberPerms] });
		if (!interaction.guild.me.permissions.has('KICK_MEMBERS')) return interaction.followUp({ embeds: [bothasNoPerms] });
		if (kickMember.roles.highest.postion >= interaction.member.roles.highest.position) return interaction.followUp({ embeds: [roleHierarchy] });
		if (kickMember.roles.highest.position >= interaction.guild.me.roles.highest.postion) return interaction.followUp({ embeds: [botRoleHierarchy] });
		if (kickMember === interaction.guild.me) return interaction.followUp({ content: "Don't kick me please!" });
		// Kick function

		// Prompt the user after they do /kick
		const promptUser = new MessageEmbed()
			.setDescription(`Are you sure you want to kick this user?`)
			.setColor('DARK_BUT_NOT_BLACK')
			.setTimestamp();
		// Buttons to show up with the promptUser embed
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('yes')
				.setLabel('Yes')
				.setStyle('SUCCESS'),
			new MessageButton()
				.setCustomId('no')
				.setLabel('No')
				.setStyle('DANGER'),
		);

		// Send the buttons and embed
		interaction.followUp({ embeds: [promptUser], components: [row] });
		// Filter
		const filter = () => {
			if (interaction.member.id === interaction.user.id) return true;
			// If someone else tries to click on the button
			return interaction.followUp({ content: 'You can\'t use this button.' });
		};

		// Collector
		const collector = interaction.channel.createMessageComponentCollector({
			filter,
			max: 1,
		});

		collector.on('end', (ButtonInteraction) => {
			const id = ButtonInteraction.first().customId;
			// no
			if (id === 'no') {
				return interaction.followUp({ embeds: [promptFailed] });
			}
			// yes
			if (id === 'yes') {
				// try-catch, if it catches an error, then it sends error buttons and embed
				try {
					kickMember.kick(reason);
					interaction.followUp({ embeds: [successfullyKicked] });
				}

				catch (error) {
					// Console log the error
					console.log(chalk.red(`[error] - An error occured in kick.js.\nError: ${error}`));
					// errorEmbed
					const unknownError = new MessageEmbed()
						.setDescription(`**An unknown error occured while I tried to execute this command.**\nPlease click on the buttons below to file an issue or if you know how to fix it, submit a pull request.`)
						.addField(`Error`, `${error}`)
						.setColor(client.colors.error)
						.setTimestamp();
					interaction.followUp({ embeds: [unknownError], components: [errorButtons] });

					// "thanks for submitting" messages
					if (interaction.isButton()) {
						if (interaction.customId === 'issue') {
							interaction.followUp({ content: `${interaction.member.username}, thanks for submitting an issue! We will look into it as soon as possible.` });
						}
						else if (interaction.customId === 'pull-request') {
							interaction.followUp({ content: `${interaction.member.username}, thanks for submitting a pull request! We will look into it as soon as possible.` });
						}
					}
				}
			}
		});


	},


};
