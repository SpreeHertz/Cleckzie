const { ApplicationCommandType, ApplicationCommandOptionType, ChannelType } = require('discord.js');

module.exports = {
    name: 'voice',
    description: 'Manage users in your voice channel',
    type: ApplicationCommandType.ChatInput,

    options: [
        {
            name: 'moveall',
            description: 'Move all users in your voice channel to another',
            type: ApplicationCommandOptionType.Subcommand,
            default_member_permissions: 'MoveMembers',
            options: [
                {
                    name: 'channel',
                    description: 'Destination voice channel',
                    type: ApplicationCommandOptionType.Channel,
                    channel_types: [ChannelType.GuildVoice],
                    required: true,
                }
            ]
        },
        {
            name: 'muteall',
            description: 'Server mute all users in your voice channel',
            type: ApplicationCommandOptionType.Subcommand,
            default_member_permissions: 'MuteMembers',
            options: [
                {
                    name: 'role',
                    description: 'Only mute members with this role',
                    type: ApplicationCommandOptionType.Role,
                    required: false,
                }
            ]
        },
        {
            name: 'unmuteall',
            description: 'Server unmute all users in your voice channel',
            type: ApplicationCommandOptionType.Subcommand,
            default_member_permissions: 'MuteMembers',
            options: [
                {
                    name: 'role',
                    description: 'Only unmute members with this role',
                    type: ApplicationCommandOptionType.Role,
                    required: false,
                }
            ]
        },
        {
            name: 'deafenall',
            description: 'Server deafen all users in your voice channel',
            type: ApplicationCommandOptionType.Subcommand,
            default_member_permissions: 'DeafenMembers',
             options: [
                {
                    name: 'role',
                    description: 'Only deafen members with this role',
                    type: ApplicationCommandOptionType.Role,
                    required: false,
                }
            ]
        },
          {
            name: 'undeafenall',
            description: 'Server undeafen all users in your voice channel',
            type: ApplicationCommandOptionType.Subcommand,
            default_member_permissions: 'DeafenMembers',
             options: [
                {
                    name: 'role',
                    description: 'Only undeafen members with this role',
                    type: ApplicationCommandOptionType.Role,
                    required: false,
                }
            ]
        },
    ],
    run: async (client, interaction) => {
        const subcommand = interaction.options.getSubcommand();
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) {
            return interaction.reply({ content: 'You need to be in a voice channel.', ephemeral: true });
        }

        await interaction.deferReply({ ephemeral: true });

        if (subcommand === 'moveall') {
            const target = interaction.options.getChannel('channel');
            let count = 0;

            for (const [, member] of voiceChannel.members) {
                try {
                    await member.voice.setChannel(target);
                    count++;
                } catch {}
            }

            return interaction.editReply(`Moved ${count} member(s) to ${target.name}.`);
        }

        if (subcommand === 'muteall' || subcommand === 'unmuteall') {
            const role = interaction.options.getRole('role');
            const muting = subcommand === 'muteall';
            let members = [...voiceChannel.members.values()];

            if (role) {
                members = members.filter(m => m.roles.cache.has(role.id));
            }

            let count = 0;
            for (const member of members) {
                try {
                    await member.voice.setMute(muting);
                    count++;
                } catch {}
            }

            return interaction.editReply(`${muting ? 'Muted' : 'Unmuted'} ${count} member(s)${role ? ` with role ${role.name}` : ''}.`);
        }

        if (subcommand === 'deafenall' || subcommand === 'undeafenall') {
            const role = interaction.options.getRole('role');
            const deafening = subcommand === 'deafenall';
            let members = [...voiceChannel.members.values()];

            if (role) {
                members = members.filter(m => m.roles.cache.has(role.id));
            }

            let count = 0;

            for (const [, member] of voiceChannel.members) {
                try {
                    await member.voice.setDeaf(deafening);
                    count++;
                } catch {}
            }

            return interaction.editReply(`${deafening ? 'Deafened' : 'Undeafened'} ${count} member(s)${role ? ` with role ${role.name}` : ''}.`);
        }
    }
};