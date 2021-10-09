// Mentioning the packages
const { Client, Message, MessageEmbed } = require('discord.js');
let mdur = require('moment-duration-format'),
    os = require('os'),
    cpuStat = require('cpu-stat'),
    ms = require('ms'),
    moment = require('moment')

// Command    
module.exports = {
    name: 'stats',
    aliases: ['uptime'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        // Defining the duration 
        const duration = moment.duration(client.uptime).format(' D [days], H [hours], m [mins], s [secs]');
        cpuStat.usagePercent(function (error, percent, seconds) {
            // Error handler
            if (error) {
              return console.error(error)
            }
            // Defining the cores, cpuModel, guilds, users, channels, usage, node, CPU, ping, and ping representation circles
            const cores = os.cpus().length
            const cpuModel = os.cpus()[0].model
            const guilds = client.guilds.cache.size.toLocaleString()
            const users = client.users.cache.size.toLocaleString()
            const channels = client.channels.cache.size.toLocaleString()
            const usage = formatBytes(process.memoryUsage().heapUsed)
            const node = process.version
            const CPU = percent.toFixed(2)
            let ping = message.createdTimestamp - message.createdTimestamp;

            let circles = {
                green: "🟢",
                yellow: "🟡",
                red: "🔴"
            }

            // the Final embed
            const embed = new MessageEmbed()
            .setTitle("Cleckzie Stats")
            .addFields(
                { name: ':alarm_clock:  Uptime', value: `${duration}`, inline: false },
                { name: ':file_folder: Servers', value: `${guilds}`, inline: false },
                { name: ':busts_in_silhouette: Users', value: `${users}`, inline: false},
                { name: ':file_folder: Channels', value: `${channels}`, inline: false},
                { name: ':computer: Node Version', value: `${node}`, inline: false},
                { name: ':robot: CPU Usage', value: `${usage}`, inline: false },
                { name: ':robot: CPU Model', value: `${cpuModel}`, inline: false },
                { name: ':robot: CPU Cores', value: `${cores}`, inline: false },
                { name: ':radio_button: Voice Channels Connected', value: `${client.voice.connections.size}`, inline: false },
                { name: `${client.ws.ping <= 200 ? circles.green : client.ws.ping <= 400 ? circles.yellow : circles.red} Ping`,
                  value: `${client.ws.ping}ms`, inline: false})

            .setTimestamp()
            .setColor("RANDOM")

            message.channel.send(embed)
    }
        )
        // formateBytes
        function formatBytes (a, b) {
            let c = 1024;
            d = b || 2
            e = ["B", "KB", "MB", "GB", "TB"],
            f = Math.floor(Math.log(a) / Math.log(c));

            return parseFloat((a / Math.pow(c, f)).toFixed(d)) + "" + e[f]
        }
    }
}