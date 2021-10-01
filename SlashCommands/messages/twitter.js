const { MessageEmbed } = require("discord.js");
const request = require("node-superfetch");
const { stripIndents } = require('common-tags');
const { SlashCommandBuilder } = require('@discordjs/builders');
const chalk = require("chalk");


module.exports = {

	...new SlashCommandBuilder()
		.setName("twitter")
		.setDescription("Get a twitter user's information")
		.addStringOption((option) =>
			option
				.setName('username')
				.setDescription("Who to lookup")
				.setRequired(true),
		),
	/**
     *
     * @param {String[]} args
     */
	run: async (args, interaction) => {
		const username = interaction.options.getString('username');
		if (!username) return interaction.followUp({ content: 'Please provide a username', ephemeral: true });
		if (!process.env.bearer) return console.log(chalk.blueBright('[twitter.js]') + chalk.red(' You have not specified the Twitter Bearer in your .env file. This command won\'t work. '));
		try {
			const { body } = await request.get("https://api.twitter.com/1.1/users/show.json")
				.set({ Authorization: `Bearer ${process.env.twitter_bearer}` }).query({ screen_name: username });

			const tweetEmbed = new MessageEmbed()
				.setAuthor(`@${body.screen_name.toLowerCase()}`, body.verified ? "https://emoji.gg/assets/emoji/6817_Discord_Verifed.png" : null)
				.setDescription(body.description)
				.setFooter(`Twitter ID: ${body.id}`, "https://abs.twimg.com/favicons/twitter.ico")
				.addField("Counts:", stripIndents`
        - **Followers:** ${(body.followers_count).toLocaleString()}
        - **Following:** ${(body.friends_count).toLocaleString()}
        - **Tweets:** ${(body.statuses_count).toLocaleString()}
        `, true)
				.addField("Created since:", body.created_at, true)
				.setThumbnail(body.profile_image_url_https.replace('_normal', ''))
				.setImage(body.profile_banner_url)
				.setColor("#1DA1F2");


			return interaction.followUp({ embeds: [tweetEmbed] });
		}
		catch (error) {
			if (error.status === 403) return interaction.followUp({ content: "This user's account is private, or closed their account.", ephemeral: true });
			else if (error.status === 404) return interaction.followUp({ content: ":x: Error 404: User **not found**.", ephemeral: true });
			else return interaction.followUp({ content: "An unknown error occured.", ephemeral: true });
		}
	},
};