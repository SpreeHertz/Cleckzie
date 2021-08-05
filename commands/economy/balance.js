const { Client, Message, MessageEmbed } = require('discord.js');
const mongoCurrency = require('discord-mongo-currency');

module.exports = {
    name: 'balance',
    aliases: ['bal'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const member = message.mentions.members.first() || message.member;

        const user = await mongoCurrency.findUser(member.id, message.guild.id); // Get the user from the database.

        const embed = new MessageEmbed()
            .setTitle(`${member.user.username}'s Balance`)
            .addField(`Wallet`, `${user.coinsInWallet || "0"}`)
            .addField(`Bank`, `${user.coinsInBank || "0"}/${user.bankSpace || "None"}`)
            .addField(`Total`, `${user.coinsInBank + user.coinsInWallet || "0"}`)
            .setColor('RANDOM')



        message.channel.send({embeds: [embed]});
    }
}
