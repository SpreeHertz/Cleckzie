const Discord = require('discord.js');
const { Client, Message } = require('discord.js');
const fetch = require('node-fetch').default;

module.exports = {
    name: "cats",
    description: "Sends a cute cat image!",
    /**
     * JSDOC
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async (client, message, args) => {
        fetch('https://api.snowflakedev.xyz/api/cat', {
		headers: {
			// Change this API key pls
			'Authorization': 'NzU1ODI2OTY4OTAxMDU4Njgy.MTYxNzAxMTk0NTExOQ==.27f79a371be074b6cf7472ee0a75224c',
		},
	})
		.then(res => res.buffer())
		.then(data => {
			message.reply({ files: [new Discord.MessageAttachment(data, 'cat.png')], allowedMentions: { repliedUser: false } });
		})
		.catch(e => console.error(e));


    }
}