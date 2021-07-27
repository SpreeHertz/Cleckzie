const { tictactoe } = require('reconlx')

module.exports = {
    name : 'tictactoe',
    description: "Plays TicTacToe with you!",
    category: "fun",

    run : async(client, message, args) => {
        const member = message.mentions.members.first()
            if(!member)  return  message.channel.send('Please specify a member.')

        new tictactoe({
            player_two: member,
            message: message
        })
    }
}
