module.exports = {
	name: 'moderated-nickname',
	aliases: ['moderated-nick', 'mod-nick', 'modnick'],
	/**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
	run: async (client, message, args) => {
		const moderatedMember = message.mentions.members.first();
		if (!message.author.permissions.has('MANAGE_NICKNAMES')) return;
		const mReason = args[1];
		const randomID = length => Math.floor(Math.random() * Math.pow(5, length));
		if (!moderatedMember) {
			return message.channel.send('Please specify a user for me to moerate their nickname.');
		}
		else {
			try {
				moderatedMember.setNickname(`Moderated Nickname ${randomID}`, `${mReason} | Executed by ${message.author}`);
			}
			catch (error) {
				console.error(error);
				message.channel.send('Couldn\'t moderate their nickname. This is probably because I don\'t have the role hierarchy to do this.');
			}
		}

	},
};