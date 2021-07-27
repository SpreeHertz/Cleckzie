const { Discord, Client, Message, MessageEmbed } = require('discord.js')
const { DiscordBattleShip } = require('discord-battleship')

module.exports = {
    name: "battleship",
    run: async (client, message, args) => {
        let user = message.mentions.members.first();
  if (!user || user.id === message.member.id || user.user.bot)
    return message.channel.send(
      "Please include a user or include a user which isn't you or a bot."
    );


  const BattleShip = new DiscordBattleShip({
    prefix: "prefix"
  });
  await BattleShip.createGame(message);

    }
}

