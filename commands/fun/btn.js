const { MessageButton } = require('discord-buttons');


module.exports = {
    name: 'test',
    run: async (client, message, args) => {
        let buttonn = new MessageButton()
          .setStyle('red') 
          .setLabel('button test') 
          .setID('click_to_function') 
          

          await message.channel.send('Hey', { button: buttonn });
    }
}