/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// Mentioning the packages
const { MessageEmbed, CommandInteraction } = require('discord.js');
const mdur = require('moment-duration-format');
const os = require('os');
const cpuStat = require('cpu-stat');
const ms = require('ms');
const moment = require('moment');
const client = require('../../index');

// Command
module.exports = {
	name: 'stats',
	description: 'Returns statistics of the bot',
	run: async (args, interaction) => {
		// Defining the duration
		const duration = moment.duration(client.uptime).format(' D [days], H [hours], m [mins], s [secs]');
		cpuStat.usagePercent(function(error, percent, seconds) {
			// Error handler
			if (error) {
				return console.error(error);
			}

			// Defining the cores, cpuModel, guilds, users, channels, usage, node, CPU, and ping representation circles
			const cores = os.cpus().length;
			const cpuModel = os.cpus()[0].model;
			const guilds = client.guilds.cache.size.toLocaleString();
			const users = client.users.cache.size.toLocaleString();
			const channels = client.channels.cache.size.toLocaleString();
			const usage = formatBytes(process.memoryUsage().heapUsed);
			const node = process.version;
			const CPU = percent.toFixed(2);
			const circles = {
				green: "🟢",
				yellow: "🟡",
				red: "🔴",
			};

			// The final embed
			const statsEmbed = new MessageEmbed()
				.setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({ dynamic: true })}`)
				.addFields(
					{ name: ':alarm_clock:  Uptime', value: `${duration}`, inline: false },
					{ name: ':file_folder: Servers', value: `${guilds}`, inline: false },
					{ name: ':busts_in_silhouette: Users', value: `${users}`, inline: false },
					{ name: ':file_folder: Channels', value: `${channels}`, inline: false },
					{ name: ':computer: Node Version', value: `${node}`, inline: false },
					{ name: ':robot: CPU Usage', value: `${usage}`, inline: false },
					{ name: ':robot: CPU Model', value: `${cpuModel}`, inline: false },
					{ name: ':robot: CPU Cores', value: `${cores}`, inline: false },
					{ name: `${client.ws.ping <= 200 ? circles.green : client.ws.ping <= 400 ? circles.yellow : circles.red} Ping`,
						value: `${client.ws.ping}ms`, inline: false })

				.setTimestamp()
				.setColor('BLURPLE');

			interaction.followUp({ embeds: [statsEmbed] });
		},
		);
		// formatBytes
		function formatBytes(a, b) {
			const c = 1024;
			d = b || 2;
			e = ["B", "KB", "MB", "GB", "TB"],
			f = Math.floor(Math.log(a) / Math.log(c));

			return parseFloat((a / Math.pow(c, f)).toFixed(d)) + "" + e[f];
		}
	},
};