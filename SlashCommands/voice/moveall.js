const { ApplicationCommandType, MessageFlags, ChannelType, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'moveall',
    description: "Move all users to a different voice channel",
    type: ApplicationCommandType.ChatInput,
    default_member_permissions: 'MoveMembers',
     options: [
        {
            name: 'channel',
            description: 'The voice channel to move everyone to',
            type: ApplicationCommandOptionType.Channel,
            channel_types: [ChannelType.GuildVoice],
            required: true,
        }
    ],
    required: true,
    cooldown: 5000,
    run: async (client, interaction) => {
       const targetChannel = interaction.options.getChannel('channel');
        const sourceChannel = interaction.member.voice.channel;

        if (!sourceChannel) {
            return interaction.reply({ content: "You need to be in a voice channel." });
        }
        if (sourceChannel.id === targetChannel.id) {
            return interaction.reply({ content: "You are already in that voice channel." });
        }
        // sourceChannel.members is a Collection of GuildMembers currently in that channel 
        const members = sourceChannel.members;

        await interaction.deferReply({ flags: MessageFlags.Ephemeral });

        let moved = 0;
        for (const [, member] of members) {
            try {
                await member.voice.setChannel(targetChannel, `Moved by ${interaction.user.tag} using /moveall`);
                moved++;
            } catch (e) {
                interaction.editReply({ content: `Failed to move members.\nError: ${e}` });
            }
        }

        return interaction.editReply({ content: `Moved ${moved} member(s) to ${targetChannel.name}.` });
    }

};