const got = require('got')
const { MessageEmbed } = require('discord.js')
module.exports = {
    name : 'earthp',
    aliases: ['earthporn'],
    description: "This is not an NSFW command at all! Shows beautiful pictures of the earth.",

    run : async(client, message) => {
        got('https://www.reddit.com/r/earthporn/random/.json').then(res => {
            let content = JSON.parse(res.body)
            message.channel.send(
                new MessageEmbed()
                    .setTitle(content[0].data.children[0].data.title)
                    .setImage(content[0].data.children[0].data.url)
                    
                    .setColor("RANDOM")
                    .setFooter(`👍 ${content[0].data.children[0].data.ups} 👎 ${content[0].data.children[0].data.downs} | Comments : ${content[0].data.children[0].data.num_comments}`)
            )
        })
    }
}