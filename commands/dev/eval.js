const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const util = require('util');
const devID = require('../../config/bot').devs;  

module.exports = {
    name: 'eval',
    aliases: ['e'],
    description: 'Runs JS as the Discord bot client. (Bot owner only)',
    run: async (client, message, args) => {
             const roleColor =
            message.guild.me.displayHexColor === "#000000"
                ? "#ffffff"
                : message.guild.me.displayHexColor;

        let code = args.join(' ');

        if (message.author.id !== devID)
            return message.channel.send("Hey! You can't use that.")

        if (!code) {
         const noCode = new MessageEmbed()
        .setTitle('Eval Usage')
        .setDescription(`Usage: **\`${client.config.discord.prefix}eval <code>\`**`)
        .setColor(roleColor)
        return message.channel.send({ embeds: [noCode]})
        }

        try {
            let evaled = await eval(code),
                output;
            if (evaled.constructor.name === `Promise`) {
                output = `📤 Output`;
            } else {
                output = `📤 Output`;
            }
            if (evaled.length > 800) {
                evaled = evaled.substring(0, 800) + `...`;
            }
            const inputEmbed = new MessageEmbed()
                .addField(`📥 Input`, `\`\`\`\n${code}\n\`\`\``)
                .addField(output, `\`\`\`js\n${evaled}\n\`\`\``)
                .setColor(client.color)
                .addField(`Status`, `Success`)
                .setColor(roleColor)
            return message.channel.send({embeds: [inputEmbed]});
        } catch (e) {
            console.log(e.stack);
            const failedEmbed = new MessageEmbed()
                .addField(`📥 Input`, `\`\`\`\n${code}\n\`\`\``)
                .addField(`📤 Output`, `\`\`\`js\n${e}\n\`\`\``)
                .addField(`Status`, `Failed`)
                .setColor("#FF0000")
            return message.channel.send({embeds: [failedEmbed]});
        }
    }
};