const Discord = require("discord.js")
module.exports = {
  name : "biden",
  description : "Biden image generation command.",
  run: async(client, message, args) => {
   const sentence = args.join("+")
    if (!sentence) return message.channel.send("Please provide valid text!")
    let embed = new Discord.MessageEmbed()
      .setTitle('Joe Biden')
      .setImage(`https://gofaizen.sirv.com/Joe%20Biden%20Tweet.jpeg?w=900&h=900&text.0.text=${sentence}&text.0.position.x=-74%25&text.0.position.y=-67%25&text.0.size=24&text.0.color=000000&text.0.font.weight=700`)
      .setColor('GREEN')
      .setTimestamp()
    message.channel.send({embeds: [embed]})
  }
  }