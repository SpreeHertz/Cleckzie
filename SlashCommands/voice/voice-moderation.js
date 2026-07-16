const {
    ApplicationCommandType,
    ApplicationCommandOptionType,
    ChannelType,
    EmbedBuilder,
    PermissionFlagsBits,
} = require('discord.js');

module.exports = {
    name: 'voice',
    description: 'Manage users in your voice channel',
    type: ApplicationCommandType.ChatInput,

    options: [
        {
            name: 'moveall',
            description: 'Move all users in your voice channel to another',
            type: ApplicationCommandOptionType.Subcommand,
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
            options: [
                {
                    name: 'include_role',
                    description: 'Only mute members with this role',
                    type: ApplicationCommandOptionType.Role,
                    required: false,
                },
                {
                    name: 'exclude_role',
                    description: "Members with this role won't be muted",
                    type: ApplicationCommandOptionType.Role,
                    required: false,
                }
            ]
        },
        {
            name: 'unmuteall',
            description: 'Server unmute all users in your voice channel',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'include_role',
                    description: 'Only unmute members with this role',
                    type: ApplicationCommandOptionType.Role,
                    required: false,
                },
                {
                    name: 'exclude_role',
                    description: "Members with this role won't be unmuted",
                    type: ApplicationCommandOptionType.Role,
                    required: false,
                }
            ]
        },
        {
            name: 'deafenall',
            description: 'Server deafen all users in your voice channel',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'include_role',
                    description: 'Only deafen members with this role',
                    type: ApplicationCommandOptionType.Role,
                    required: false,
                },
                {
                    name: 'exclude_role',
                    description: "Members with this role won't be deafened",
                    type: ApplicationCommandOptionType.Role,
                    required: false,
                }
            ]
        },
        {
            name: 'undeafenall',
            description: 'Server undeafen all users in your voice channel',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'include_role',
                    description: 'Only undeafen members with this role',
                    type: ApplicationCommandOptionType.Role,
                    required: false,
                },
                {
                    name: 'exclude_role',
                    description: "Members with this role won't be undeafened",
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
            return interaction.reply({
                content: 'You need to be in a voice channel.',
                ephemeral: true,
            });
        }

        await interaction.deferReply();

        const me = interaction.guild.members.me;
        const embed = new EmbedBuilder()
        const colors = {
            'success': 0x57F287,
            'error': 0xED4245,
            'info': 0x5865F2
        }
        function updatedEmbed(description, color) {
            return embed.setDescription(description).setColor(color);
        }
        if (subcommand === 'moveall') {
            if (!interaction.member.permissions.has(PermissionFlagsBits.MoveMembers)) {
                return interaction.editReply({ embeds: [updatedEmbed('You do not have permission to move members.', colors.error)] });
            }

            if (!me.permissions.has(PermissionFlagsBits.MoveMembers)) {
                return interaction.editReply({ embeds: [updatedEmbed('I do not have permission to move members.', colors.error)] });
            }

            const target = interaction.options.getChannel('channel');

            if (target.id === voiceChannel.id) {
                return interaction.editReply({ embeds: [updatedEmbed('Destination channel cannot be the same as your current channel.', colors.error)] });
            }

            let count = 0;
            let failed = 0;

            for (const member of voiceChannel.members.values()) {
                try {
                    await member.voice.setChannel(
                        target,
                        `Moved by ${interaction.user.tag}`
                    );

                    count++;
                } catch {
                    failed++;
                }
            }
            if (count === 0) {
                return interaction.editReply({ embeds: [updatedEmbed(`No members were moved.`, colors.info)] }
                );
            }
            let memberString = count === 1 ? "member" : "members";
            return interaction.editReply({ embeds: [updatedEmbed(`✅ Moved ${count} ${memberString} in ${voiceChannel}${failed ? ` (${failed} failed)` : ''}.`, colors.success)] }
            );
        }

        if (subcommand === 'muteall' || subcommand === 'unmuteall') {
            if (!interaction.member.permissions.has(PermissionFlagsBits.MuteMembers)) {
                return interaction.editReply({ embeds: [updatedEmbed('You do not have permission to mute members.', colors.error)] });
            }

            if (!me.permissions.has(PermissionFlagsBits.MuteMembers)) {
                return interaction.editReply({ embeds: [updatedEmbed('I do not have permission to mute members.', colors.error)] });
            }

            const includeRole = interaction.options.getRole('include_role');
            const excludeRole = interaction.options.getRole('exclude_role');

            if (
                includeRole &&
                excludeRole &&
                includeRole.id === excludeRole.id
            ) {
                return interaction.editReply({ embeds: [updatedEmbed('Include role and exclude role cannot be the same.', colors.error)] });
            }

            const muting = subcommand === 'muteall';

            let members = [...voiceChannel.members.values()];

            if (includeRole) {
                members = members.filter(member =>
                    member.roles.cache.has(includeRole.id)
                );
            }

            if (excludeRole) {
                members = members.filter(member =>
                    !member.roles.cache.has(excludeRole.id)
                );
            }

            let count = 0;
            let failed = 0;

            for (const member of members) {
                try {
                    await member.voice.setMute(
                        muting,
                        `${muting ? 'Muted' : 'Unmuted'} by ${interaction.user.tag}`
                    );

                    count++;
                } catch {
                    failed++;
                }
            }

            let memberString = count === 1 ? "member" : "members";

            return interaction.editReply({ embeds: [updatedEmbed(`✅ ${muting ? 'Muted' : 'Unmuted'} ${count} ${memberString} in ${voiceChannel}${failed ? ` (${failed} failed)` : ''}.`, colors.success)] }
            );
        }

        if (subcommand === 'deafenall' || subcommand === 'undeafenall') {
            if (!interaction.member.permissions.has(PermissionFlagsBits.DeafenMembers)) {
                return interaction.editReply({ embeds: [updatedEmbed('You do not have permission to deafen members.', colors.error)] });
            }

            if (!me.permissions.has(PermissionFlagsBits.DeafenMembers)) {
                return interaction.editReply({ embeds: [updatedEmbed('I do not have permission to deafen members.', colors.error)] });
            }

            const includeRole = interaction.options.getRole('include_role');
            const excludeRole = interaction.options.getRole('exclude_role');

            if (
                includeRole &&
                excludeRole &&
                includeRole.id === excludeRole.id
            ) {
                return interaction.editReply({ embeds: [updatedEmbed('Include role and exclude role cannot be the same.', colors.error)] });
            }

            const deafening = subcommand === 'deafenall';

            let members = [...voiceChannel.members.values()];

            if (includeRole) {
                members = members.filter(member =>
                    member.roles.cache.has(includeRole.id)
                );
            }

            if (excludeRole) {
                members = members.filter(member =>
                    !member.roles.cache.has(excludeRole.id)
                );
            }

            let count = 0;
            let failed = 0;

            for (const member of members) {
                try {
                    await member.voice.setDeaf(
                        deafening,
                        `${deafening ? 'Deafened' : 'Undeafened'} by ${interaction.user.tag}`
                    );

                    count++;
                } catch {
                    failed++;
                }
            }

            let memberString = count === 1 ? "member" : "members";

            return interaction.editReply({ embeds: [updatedEmbed(`✅ ${deafening ? 'Deafened' : 'Undeafened'} ${count} ${memberString} in ${voiceChannel}${failed ? ` (${failed} failed)` : ''}.`, colors.success)] }
            );
        }
    },
};

