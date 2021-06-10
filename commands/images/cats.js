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
			'Authorization': process.env.snowflake_api_key,
		},
	})
		.then(res => res.buffer())
		.then(data => {
			message.reply({ files: [new Discord.MessageAttachment(data, 'cat.png')], allowedMentions: { repliedUser: false } });
		})
		.catch(e => console.error(e));


    }
}