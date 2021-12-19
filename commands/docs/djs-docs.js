const axios = require("axios");
const chalk = require("chalk");

module.exports = {
	name: "djs",
	aliases: ["docs"],
	/**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
	run: async (client, message, args) => {
		try {
			const query = args.join(" ");
			if (!query) return message.channel.send("Please specify a query!");
			const url = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
				query,
			)}`;

			axios.get(url).then(({ data }) => {
				if (data) {
					message.channel.send({ embeds: [data] });
				}
			});
		}
		catch (error) {
			console.log(chalk.red(`An error occured from djs-docs.js. Error: ${error}`));
			message.channel.send(`An unknown error occured: ${error}`);
		}
	},
};