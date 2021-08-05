const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')
module.exports = {
    name: "tweet",
    description: "tweet something on Twitter!",
    run: async (client, message, args) => {
        fetch(`https://nekobot.xyz/api/imagegen?type=tweet&username=${message.author.username}&text=${args.join(' ')}`)
            .then((res) => res.json())
            .then((data) => {
                let embed = new MessageEmbed()
                    .setTitle("Tweet:")
                    .setImage(data.message)
                    .setColor("BLUE")
                    .setTimestamp()
                message.channel.send({embeds: [embed]})
            })
    }
}