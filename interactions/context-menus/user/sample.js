module.exports = {
	data: {
		name: "sample",
		type: 2, // 2 is for user context menus
	},

	/**
	 * @description Executes when the context option with name "sample" is clicked.
	 * @author Krish Garg
	 * @param {Object} interaction The Interaction Object of the command.
	 */

	async execute(interaction) {
		await interaction.reply({
			content: "I am a sample user context menu.",
		});
		return;
	},
};
