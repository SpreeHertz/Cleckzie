module.exports = {
	name: "ping",

	/** You need to uncomment below properties if you need them. */
	// description: 'Ping!',
	// usage: 'put usage here',
	// permissions: 'SEND_MESSAGES',
	// guildOnly: true,

	/**
	 * @description Executes when the command is called by command handler.
	 * @author Naman Vrati
	 * @param {Object} message The Message Object of the command.
	 * @param {String[]} args The Message Content of the received message seperated by spaces (' ') in an array, this excludes prefix and command/alias itself.
	 */

	execute(message) {
		message.channel.send({ content: "Pong." });
	},
};
