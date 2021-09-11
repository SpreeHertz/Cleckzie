/* eslint-disable no-undef */
/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');


module.exports = {
	name: 'info',
	description: 'Returns information of Cleckzie.',
	type: 'CHAT_INPUT',
	/**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
	run: async (client, message, args) => {
        const row = new MessageActionRow()
        .addComponents(
          // ...
        );

const repositoryButton = new MessageButton()
.setStyle('LINK')
.setLabel('GitHub Repository')
.setURL('https://github.com/spreehertz/cleckzie');


     await interaction.reply({ content: 'Links:', components: [row] });

	},
};