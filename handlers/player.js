const fs = require('fs');

module.exports = (client) => {
    const player = fs.readdirSync('../player').filter(file => file.endsWith('.js'));
    for (const file of player) {
        console.log(`Loading discord-player event ${file}`);
        const event = require(`../player/${file}`);
        client.player.on(file.split(".")[0], event.bind(null, client));
    };
}