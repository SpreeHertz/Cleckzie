/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// Mentioning the packages
const { MessageEmbed, CommandInteraction, Message } = require('discord.js');
const mdur = require('moment-duration-format');
const os = require('os');
const cpuStat = require('cpu-stat');
const ms = require('ms');
const moment = require('moment');
const { models, connection } = require("mongoose");
const devs = require('../../config/config.json').developers.devId;

// Command
module.exports = {
	name: 'devstats',
	description: 'Returns statistics of the bot',
	run: async (client, message, args) => {
		const values = Object.values(models);
		const totalEntries = await values.reduce(async (accumulator, model) => {
			const counts = await model.countDocuments();
			return (await accumulator) + counts;
		}, Promise.resolve(0));

		// Defining the duration
		const duration = moment.duration(client.uptime).format(' D [days], H [hours], m [mins], s [secs]');
		cpuStat.usagePercent(function(error, percent, seconds) {
			// Error handler
			if (error) {
				console.log(error);
				interaction.followUp({ content: `An unknown error occured. ${error}` });
			}

			if (message.author.id !== devs) {
				return message.channel.send({ content: 'You are not allowed to use this command.' });
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
					{ name: ':computer: Node Version', value: `${node}`, inline: false },
					{ name: ':robot: CPU Usage', value: `${usage}`, inline: false },
					{ name: ':robot: CPU Model', value: `${cpuModel}`, inline: false },
					{ name: ':robot: CPU Cores', value: `${cores}`, inline: false },
					{ name: ':computer: Discord.js', value: `${require("../../package.json").dependencies['discord.js']}` },
					{ name: `:snail: Database State`, value: `${switchTo(connection.readyState)}` },
					{ name: ":ticket: Database Entries", value: `${totalEntries}` },
					{ name: `${client.ws.ping <= 200 ? circles.green : client.ws.ping <= 400 ? circles.yellow : circles.red} Websocket Ping`, value: `${client.ws.ping}ms`, inline: false },
				)

				.setTimestamp()
				.setColor('BLURPLE')
				.setFooter('Stats for developers.');

			message.channel.send({ embeds: [statsEmbed] });
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
		function switchTo(val) {
			let status = " ";
			switch (val) {
			case 0 : status = `:red_circle: Disconnected`;
				break;
			case 1 : status = `:green_circle: Connected`;
				break;
			case 2 : status = `:yellow_circle: Connecting`;
				break;
			case 3 : status = `:red_circle: Disconnecting`;
				break;
			}
			return status;
		}
	},
};