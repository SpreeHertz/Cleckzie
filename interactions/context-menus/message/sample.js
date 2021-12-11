module.exports = {
	data: {
		name: "sample",
		type: 3,
	},

	/**
	 * @description Executes when the context option with name "sample" is clicked.
	 * @author Krish Garg
	 * @param {Object} interaction The Interaction Object of the command.
	 */

	async execute(interaction) {
		await interaction.reply({
			content: "I am a sample message context menu.",
		});
		return;
	},
};
