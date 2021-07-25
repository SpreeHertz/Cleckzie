const client = require('../../index');
const Discord = require('discord.js');

client.on('interaction', async (interaction) => {
    if(interaction.isCommand()) {
        await interaction.defer().catch(() => {});

        const cmd = client.slashCommands.get(interaction.commandName);
        if(!cmd) return interaction.followUp({ contents: 'An error has occured'});

        const args = [];
        interaction.options.array().map((x) => {
            args.push(x.value);
        })
        
        cmd.run(client, interaction, args);
    }
})