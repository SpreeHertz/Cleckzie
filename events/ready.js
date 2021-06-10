
const client = require('../index')

// Console log part
client.on('ready', () => {
    console.log(`🤖 Cleckzie Stats 🤖\n💬 Channels: ${client.channels.cache.size} channels\n🕺 Users: ${client.users.cache.size} users\n💻 Servers: ${client.guilds.cache.size} servers\n\n Cleckzie is functional. ✅`)

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
})


