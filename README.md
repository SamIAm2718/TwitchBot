# TwitchBot
A Twitch chat bot originally coded for the channel https://www.twitch.tv/houseslayer. Currently still heavily a work in progress.
## Configuration
In order to run TwitchBot you must first create an `options.json` in the folder `/src/config`. The JSON file should be configured as shown below,
editing the values in angle brackets as needed:
```
[
  {
    "options": {
      "clientId": <String - Used to identify your application to the API (Default: null)>,
      "debug": <Boolean - Show debug messages in console (Default: false)>
    },
    "connection": {
      "server": <String - Connect to this server (Default: irc-ws.chat.twitch.tv)>,
      "port": <Integer - Connect on this port (Default: 80)>,
      "reconnect": <Boolean - Reconnect to Twitch when disconnected from server (Default: false)>,
      "maxReconnectAttempts": <Integer - Max number of reconnection attempts (Default: Infinity)>,
      "maxReconnectInterval": <Integer - Max number of ms to delay a reconnection (Default: 30000)>,
      "reconnectDecay": <Integer - The rate of increase of the reconnect delay (Default: 1.5)>,
      "reconnectInterval": <Integer - Number of ms before attempting to reconnect (Default: 1000)>,
      "secure": <Boolean - Use secure connection (SSL / HTTPS) (Overrides port to 443) (Default: false)>,
      "timeout": <Integer - Number of ms to disconnect if no responses from server (Default: 9999)>
    },
    "identity": {
      "username": <String - Username on Twitch>,
      "password": <String - OAuth password on Twitch>
    },
    "channels": <Array - List of channels to join when connected (Default: [])>
  },
  <String - Name of the Bot>
]
```
For an example our configuration file looks like
```json
[
  {
    "identity": {
      "username": "houseslayerbot",
      "password": "oauth:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    },
    "channels": [
      "houseslayer",
      "houseslayerbot"
    ]
  },
  "HouseslayerBot"
]
```
Finally you can edit the prefix and aliases used for the commands in the file `/src/config/commands.json`.
## Running the bot
In order to run the bot you must have either Docker or Node.js. To use Docker just build the Dockerfile provided in this directory. To use Node.js you need to grab the tmi.js
package (https://github.com/tmijs/tmi.js) by installing npm and using the command `npm install` in the `/src` directory. You can then run the bot by using the command `node bot.js`
in the `/src` directory.
## Commands
