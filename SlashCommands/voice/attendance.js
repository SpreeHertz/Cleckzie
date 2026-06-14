const {
    ApplicationCommandType,
    ApplicationCommandOptionType,
    ChannelType,
    EmbedBuilder
} = require('discord.js');

module.exports = {
    name: 'attendance',
    description: 'Return users that are present/absent in voice channel',
    type: ApplicationCommandType.ChatInput,
    options: [
    {
        name: 'role',
        description: 'Return members that are present in the voice channel with this role',
        type: ApplicationCommandOptionType.Role,
        required: false,
    }
    ],
    run: async (client, interaction) => {
    // let members = "";
    // for (const [memberId, member] of voiceChannel.members) {
    //     members += `${member.user.tag}\n`;
    // }
    const role = interaction.options.getRole('role');
    const voiceChannel = interaction.member.voice.channel;

    if (!voiceChannel) {
        return interaction.reply({
            content: 'You must be in a voice channel to use this command.',
            ephemeral: true,
        });
    }

    if (!role) {
        let presentCount = 0;

        const members = voiceChannel.members
            .map(member => {
                presentCount++;

                return `${presentCount}. **${member.user.username}** (\`${member.user.id}\`) <@${member.user.id}>`;
            })
            .join('\n');

        const noRolesMentionedEmbed = new EmbedBuilder()
        .setAuthor({
            name: interaction.user.username,
            iconURL: interaction.user.displayAvatarURL(),
        })
            .setDescription(
                `# Participants (${voiceChannel.members.size})\n\n${members || 'No participants found.'}`
            )
            .setColor('Fuchsia')
            .setFooter({
                text: `Channel ID: ${voiceChannel.id}`,
            })
            .setTimestamp();

        return interaction.reply({
            embeds: [noRolesMentionedEmbed],
        });
    }

    const presentMembers = voiceChannel.members.filter(member =>
        member.roles.cache.has(role.id)
    );

    const absentMembers = role.members.filter(member =>
        !voiceChannel.members.has(member.id)
    );

    let presentCount = 0;
    const presentText = presentMembers
        .map(member => {
            presentCount++;

            return `${presentCount}. **${member.user.username}** (\`${member.user.id}\`) <@${member.user.id}>`;
        })
        .join('\n');

    let absentCount = 0;
    const absentText = absentMembers
        .map(member => {
            absentCount++;

            return `${absentCount}. **${member.user.username}** (\`${member.user.id}\`) <@${member.user.id}>`;
        })
        .join('\n');

    const roleMentionedEmbed = new EmbedBuilder()
        .setAuthor({
            name: interaction.user.username,
            iconURL: interaction.user.displayAvatarURL({ extension: 'png' , size: 256}),
        })
        .setTitle(`${role.name} role attendance`)
        .setDescription(
            `### Present in voice (${presentMembers.size})\n\n` +
            `${presentText || 'No members present.'}\n\n` +
            `### Absent in voice (${absentMembers.size})\n\n` +
            `${absentText || 'No members absent.'}`
        )
        .setColor(interaction.member.displayHexColor || 'Fuchsia')
        .setFooter({
            text: `Channel ID: ${voiceChannel.id}`,
        })
        .setTimestamp();

    return interaction.reply({
        embeds: [roleMentionedEmbed],
    });

}}
