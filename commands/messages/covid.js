const { Discord, Client, Message, MessageEmbed } = require('discord.js')
const covid = require('novelcovid')

module.exports = {
    name: 'covid',
    description: 'Covid-19 Statistics',

    run: async(client, message) => {
        const covidStats = await covid.all()

        return message.channel.send(new MessageEmbed()
            .setTitle('😷 COVID-19 Statistics')
            .setColor("BLUE")
            .setThumbnail("https://cdn.discordapp.com/attachments/831902156482936853/832267878581534770/Coronavirus-CDC-645x645.png")
            .setFooter(`😷Stay at home!`)
            .addFields(
                { name: `🦠 Cases`, value: covidStats.cases.toLocaleString(), inline: true},
                { name: `🦠 Cases Today`, value: covidStats.todayCases.toLocaleString(), inline: true},
                { name: `🦠 Deaths`, value: covidStats.deaths.toLocaleString(), inline: true},
                { name: `🦠 Deaths Today`, value: covidStats.todayDeaths.toLocaleString(), inline: true},
                { name: `🦠 Recovered`, value: covidStats.recovered.toLocaleString(), inline: true},
                { name: `🦠 Recovered Today`, value: covidStats.todayRecovered.toLocaleString(), inline: true},
                { name: `🦠 Active Cases`, value: covidStats.active.toLocaleString(), inline: true},
                { name: `🦠 In Critical Condition`, value: covidStats.critical.toLocaleString(), inline: true},
                { name: `🦠 Tested`, value: covidStats.tests.toLocaleString(), inline: true}
            )
        )
    }
}
