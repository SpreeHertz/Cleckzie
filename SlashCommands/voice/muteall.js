const { ApplicationCommandType, MessageFlags, ChannelType, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'muteall',
    description: "Mute all users in the current voice channel",
    type: ApplicationCommandType.ChatInput,
    default_member_permissions: 'MuteMembers',
    cooldown: 5000,
    run: async (client, interaction) => {
        const sourceChannel = interaction.member.voice.channel;
        if (!sourceChannel) {
            return interaction.reply({ content: "You need to be in a voice channel." });
        }
        // sourceChannel.members is a Collection of GuildMembers currently in that channel 
        const members = sourceChannel.members;

        await interaction.deferReply({ flags: MessageFlags.Ephemeral });

        let muted = 0;
        for (const [, member] of members) {
            try {
                await member.voice.setMute(true, `Muted by ${interaction.user.tag} using /muteall`);
                muted++;
            } catch (e) {
                interaction.editReply({ content: `Failed to mute members.\nError: ${e}` });
            }
        }

        return interaction.editReply({ content: `Muted ${muted} member(s) in ${sourceChannel.name}.` });
    }

};