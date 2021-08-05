const got = require('got')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name : 'dankmeme',
    description: "The bot takes media from the r/dankmemes subreddit and sends it to the discord channel.",
    run: async(client, message, args) => {
        got('https://www.reddit.com/r/dankmemes/random/.json').then(res => {
            let content = JSON.parse(res.body)
            const embed = new MessageEmbed()
                    .setTitle(content[0].data.children[0].data.title)
                    .setImage(content[0].data.children[0].data.url)
                    .setColor("RANDOM")
                    .setFooter(`👍 ${content[0].data.children[0].data.ups} 👎 ${content[0].data.children[0].data.downs} | Comments : ${content[0].data.children[0].data.num_comments}`)
                   message.channel.send({embeds: [embed]})
        })
    }
}