# Cleckzie Changelog

###  31st May 2021 <br>

Specified an emoji for the upcoming invite folder/category in `help.js`

###  3rd June 2021 <br>

Deleted an unnecessary file called `Help`.

###   6th June 2021 <br>

Made a calculator command using `discord-buttons` and `weky` packages.

### 8th June 2021 <br>

Renamed `av.js` to `avatar.js`, and if `message.author` didn't specify a query, then the bot must return with `message.author`'s avatar instead of "Please mention the user" embed.

### 10th June 2021 <br>

Fixed vulnerabilities.

### 11th June 2021 <br>

Changed names of features which were confusing. <br>
Deleted dm.js since it isn't allowed by top.gg. <br>
Made GitHub Pages. <br>

### 16th June 2021

Fixed https://dsc.gg/cleckzie's `invalid OAuth URI`. (Thanks to <a href="https://github.com/amanxd1"> amanxd1 </a> for reporting it)


### v2.0.0 [9th September 2021]

Started progress for rewriting to discord.js v13. <br>
Changes will now be marked with versions. When there's a major update, a tag will be created on GitHub. <br>
Added old files. <br>
Config folder with the file `bot.js` is now gone. `filters.js`, `config.json`, and `env.example` will be used instead. (Will be explaining env.example later) <br>
`README.md` has been updated. <br>
New command handler added. <br>
Dependabot alerts fixed. <br>

### v2.0.1 [11th September 2021]
Added ESLint to the project. <br>
Removed unneccessary packages from [package.json](https://github.com/spreehertz/cleckzie/blob/master/package.json) <br>
Added [chalk](https://npmjs.org/chalk) and used it in [ready.js](https://github.com/spreehertz/cleckzie/blob/master/events/ready.js) and [index.js](https://github.com/spreehertz/cleckzie/blob/master/index.js) <br>
Fixed [ping.js](https://github.com/spreehertz/cleckzie/blob/master/commands/info/ping.js) <br>
Added more information while doing `node .` <br>
Added [botinfo.js](https://github.com/spreehertz/cleckzie/blob/master/SlashCommands/info/botinfo.js) <br>
Made all files follow ESLint rules. <br>


