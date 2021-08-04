const chalk = require('chalk');
const headingStats = chalk.hex('#a8f9ff'); // Sky Blue
const otherStats = chalk.hex('#fff8a8'); // Yellow
const functional = chalk.hex('#a8ffb2') // Light Green

module.exports = async (client) => {
    console.log('Cleckzie is ready.')


    // Statuses part
    const arrayOfStatus = [
        `${client.users.cache.size} users`,
        `Run *help`,
        `${client.guilds.cache.size} servers`,
        `Dashboard coming soon`,
        `Join https://discord.gg/KCzWPGJWtk for updates!`


    ];
    // Statuses function
    let index = 0;
    setInterval(() => {
        if (index === arrayOfStatus.length) index = 0;
        const status = arrayOfStatus[index];


        client.user.setActivity(status);


        index++;
    }, 5000)
    
    await client.discordVoice.start();

}

