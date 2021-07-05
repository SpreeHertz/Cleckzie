const fs = require('fs');

module.exports = (client) => {
    const events = fs.readdirSync('./events/bot/').filter(file => file.endsWith('.js'));
    for (const file of events) {
        const event = require(`../events/bot/${file}`);
        client.on(file.split(".")[0], event.bind(null, client));
    };
}