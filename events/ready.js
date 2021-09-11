const client = require("../index");
const chalk = require('chalk');

client.on("ready", () =>
    console.log(chalk.yellow(`${client.user.tag}`) + chalk.green(" is up and ready to go.") + chalk.cyan("\nYou will now be able to use") + chalk.green(" Slash Commands and messages."))
);
