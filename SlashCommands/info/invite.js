const { ActionRowBuilder, ButtonBuilder, ApplicationCommandType, ButtonStyle } = require('discord.js');

module.exports = {
	name: 'invite',
	description: "Get the bot's invite link",
	cooldown: 3000,
	type: ApplicationCommandType.ChatInput,
	userPerms: [],
	botPerms: [],
	run: async (client, interaction) => {
		const inviteUrl = `https://discord.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID}&permissions=8&scope=bot%20applications.commands`;
		const actionRow = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('Invite')
					.setURL(inviteUrl)
					.setStyle(ButtonStyle.Link)
			);
		return interaction.reply({ content: "Invite me to your server with the link below.", components: [actionRow] })
	}
};
