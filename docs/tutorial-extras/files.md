---
sidebar_position: 2
---

# Files

When you first see [Cleckzie's code](https://github.com/spreehertz/cleckzie), you will see a bit of files. Here is everything you need to know about them.

### `.github` 

This is used for code analysis and an issue template on GitHub.


### `SlashCommands` 
**One of the main files**; this folder contains all of Cleckzie's slash commands.
There are some rules in this folder. They are: <br />
1) ❌ You're **not** allowed to have a `.js` file *directly* inside SlashCommands. <br />
2) ❌ You're **not** allowed to have a subfolder. For example, like this:
`SlashCommands/info/ping/ping.js`<br />
In this example, there is a folder called `ping` inside the `info` folder. That is not allowed. 

### `commands`
This folder contains all of Cleckzie's *normal* commands. i.e., the one that can be executed by typing the prefix (`*`) and then the command.

### `events`
This folder is the event handler for Cleckzie. 

:::danger Note
Only modify this file if you know what you're doing, and only modify things that we've we've told you to do. This can completely break your clone if you don't do it correctly.
:::

### `handler`
This folder is for the command handler for Cleckzie.

:::danger Note
Only modify this file if you know what you're doing, and only modify things that we've we've told you to do. This can completely break your clone if you don't do it correctly.
:::