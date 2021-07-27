const Discord = require("discord.js");
const request = require("node-superfetch");
let {stripIndents} = require('common-tags');
const bearer = process.env.twitter_bearer;

module.exports = {
    name: "twitter",
    description: "Gives information about a Twitter user.",
    usage: "*twitter SpreeHertz",
    aliases: ['twt'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
     run: async (client, message, args) => {

    let username = args[0];
    if (!username) return message.reply("Please provide me a username.")

    try {
        const {body} = await request.get("https://api.twitter.com/1.1/users/show.json")
        .set({Authorization: `Bearer ${bearer}`}).query({screen_name: username});

        const embed = new Discord.MessageEmbed()
        .setAuthor(`@${body.screen_name.toLowerCase()}`, body.verified ? "https://emoji.gg/assets/emoji/6817_Discord_Verifed.png" : null )
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
        .setColor("#1DA1F2")


        return message.channel.send(embed);
    } catch (error) {
        if (error.status === 403) return message.channel.send("This user's account is private, or closed their account.");
        else if(error.status === 404) return message.channel.send(":x: Error 404: User not found.");
        else return message.channel.send(`Unknown error: ${error.message}`);
    }
    }
}
