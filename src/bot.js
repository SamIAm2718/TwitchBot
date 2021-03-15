
const tmi = require('tmi.js');
const fs = require('fs');
const chatHandler = require('./handlers/chatHandler.js');

// load bot options from json
const optsRaw = fs.readFileSync('config/options.json');
const opts = JSON.parse(optsRaw);

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('chat', onChatHandler);
client.on('join', onJoinHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onChatHandler(target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  chatHandler.handle(target, context, msg, client);
}

// Called every time someone joins channel
function onJoinHandler(target, context, self) {
  if (self) {
    client.say(target, `Hello! HouseSlayerBot has connected to your chat. Please use !help for a list of available commands.`);
    console.log(`Bot has joined ${target}'s chat.`);
  }
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
