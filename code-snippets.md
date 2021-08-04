# Making a Code Snippet

Click on `File` above VSCode<br>![image](https://user-images.githubusercontent.com/48062454/117412734-bf70d300-af32-11eb-955d-2ad62a9c126f.png) <br> <br>

Click on `Preferences` <br> ![image](https://user-images.githubusercontent.com/48062454/117412803-d4e5fd00-af32-11eb-9da5-585c03c22bc5.png) <br> <br>

Click on `User Snippets` <br> ![image](https://user-images.githubusercontent.com/48062454/117413125-34440d00-af33-11eb-8ed3-e50c2e89ff02.png)
<br> <br>

Next, search for `javascript.json` above. <br> ![image](https://user-images.githubusercontent.com/48062454/117412949-03fc6e80-af33-11eb-98bd-3e2e94ce5e71.png) <br> <br>

Copy paste the following code:
```js
{
	"!djs": {
		"prefix": "!djs",
		"body": [
			"const { Client, Message, MessageEmbed } = require('discord.js');\r",
			"const { filters, emojis, color, footer } = require('../../config/bot');\r",
			"\r",
			"module.exports = {\r",
			"    name: '',\r",
			"    /** \r",
			"     * @param {Client} client \r",
			"     * @param {Message} message \r",
			"     * @param {String[]} args \r",
			"     */\r",
			"    run: async(client, message, args) => {\r",
			"\r",
			"    }\r",
			"}"
		],
		"description": "[djs]"
	}
}
```

Now you can do `!djs` if you're making a new file.
