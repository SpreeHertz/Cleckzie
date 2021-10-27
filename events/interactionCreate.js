const client = require("../index");

client.on("interactionCreate", async (interaction) => {
	// Slash Command Handling
	if (interaction.isCommand()) {
		await interaction.deferReply({ ephemeral: cmd.ephemeral ? cmd.ephemeral : false }).catch(() => {});

		const cmd = client.slashCommands.get(interaction.commandName);
		if (!cmd) {
			return interaction.followUp({ content: "An error has occured." });
		}

		const args = [];

		for (const option of interaction.options.data) {
			if (option.type === "SUB_COMMAND") {
				if (option.name) args.push(option.name);
				option.options?.forEach((x) => {
					if (x.value) args.push(x.value);
				});
			}
			else if (option.value) {args.push(option.value);}
		}
		interaction.member = interaction.guild.members.cache.get(interaction.user.id,
		);

		if (!interaction.member.permissions.has(cmd.userPermissions || [])) return interaction.followUp({ content: 'You do not have permission to use this command.', ephemeral: true });

		cmd.run(client, interaction, args);
	}

	// Context Menu Handling
	if (interaction.isContextMenu()) {
		await interaction.deferReply();
		const command = client.slashCommands.get(interaction.commandName);
		if (command) command.run(client, interaction);
	}
});
