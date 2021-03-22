const fs = require('fs');

let botFlags = {
    polling: false,
    suggestions: false
};

exports.handle = function (target, context, msg, client, commandAlias) {
    // remove special character added by chatterino
    msg = msg.replace('\u{E0000}', '');

    // is user a mod
    const userMod = context['mod'] === true || context['user-type'] == 'mod';

    // Check if the first non-whitespace char in msg is 'prefix'
    // which we will use as our prefix for bot commands
    if (msg.trim()[0] === commandAlias.get('prefix')) {
        // clean up whitespace and split command into parameters
        const commandParams = msg.trim().split(' ');

        // commands with no arguments
        if (commandParams.length === 1) {
            // help command
            if (commandParams[0] === commandAlias.get('prefix') + commandAlias.get('help')) {
                client.say(target, `Currently the only command is ${commandAlias.get('prefix') + commandAlias.get('roll')}. 
                    To see the usage of !command type !help command.`);
                console.log(`* ${context.username} executed ${msg.trim()} command`);
                return;
            }

        }

        // commands with two arguments
        else if (commandParams.length === 2) {
            // help command
            if (commandParams[0] === commandAlias.get('prefix') + commandAlias.get('help')) {
                if (commandParams[1] === commandAlias.get('roll')) {
                    client.say(target, `Syntax: ${commandAlias.get('prefix') + commandAlias.get('help')} XdY. 
                        Rolls X dice with Y sides.`);
                    console.log(`* ${context.username} executed ${msg.trim()} command`);
                    return;
                }
            }

            // command to roll arbitrary dice with syntax !roll #d#
            if (commandParams[0] === commandAlias.get('prefix') + commandAlias.get('roll')) {
                const rollParam = commandParams[1].split('d');

                if (rollParam.length === 2) {
                    const num = parseInt(rollParam[0]);
                    const sides = parseInt(rollParam[1]);
                    const numCap = 50;
                    const sidesCap = 1000;

                    if (isNaN(num) || isNaN(sides)) {
                        client.say(target, `Invalid argument for ${commandAlias.get('prefix') + commandAlias.get('help')}. 
                            Usage should be ${commandAlias.get('prefix') + commandAlias.get('help')} XdY.`);
                    } else if (num < 0 || sides <= 0) {
                        client.say(target, `Cannot roll a negative number of dice or a dice with fewer than one side.`);
                    } else if (num === 0) {
                        client.say(target, `${context.username} didn't roll any dice.`);
                    } else if (num > numCap) {
                        client.say(target, `${context.username} is trying to roll too many dice. Please roll ${numCap} or less.`);
                    } else if (sides > sidesCap) {
                        client.say(target, `${context.username}'s dice has too many sides. Please keep it ${sidesCap} or less.`);
                    } else {
                        const rolls = rollDice(num, sides);
                        client.say(target, `${context.username} rolled ${rolls}`);
                    }
                } else {
                    client.say(target, `Invalid argument for ${commandAlias.get('prefix') + commandAlias.get('help')}. 
                        Usage should be ${commandAlias.get('prefix') + commandAlias.get('help')} XdY.`);
                }

                console.log(`* ${context.username} executed ${msg.trim()} command`);
                return;
            }

            // Open polling/suggestions
            if (commandParams[0] === commandAlias.get('prefix') + commandAlias.get('open')) {
                if (userMod) {
                    if (commandParams[1] === commandAlias.get('suggestion')) {
                        if (!botFlags.suggestions) {
                            botFlags.suggestions = true;
                            client.say(target, `Suggestions are now open. Submit your suggestions using the command !line.`)
                            console.log(`* ${context.username} executed ${msg.trim()} command`);
                            return
                        } else {
                            client.say(target, `Suggestions are already open.`)
                            console.log(`* ${context.username} executed ${msg.trim()} command`)
                            return
                        }
                    }
                } else {
                    console.log(`User ${context.username} tried to issue moderator command ${msg.trim()} as a normal user.`)
                    return
                }
            }

            // Close polling/suggestions
            if (commandParams[0] === commandAlias.get('prefix') + commandAlias.get('close')) {
                if (userMod) {
                    if (commandParams[1] === commandAlias.get('suggestion')) {
                        if (botFlags.suggestions) {
                            botFlags.suggestions = false;
                            client.say(target, `Suggestions are now closed.`)
                            console.log(`* ${context.username} executed ${msg.trim()} command`)
                            return
                        } else {
                            client.say(target, `Suggestions are not currently open.`)
                            console.log(`* ${context.username} executed ${msg.trim()} command`)
                            return
                        }
                    }
                } else {
                    console.log(`User ${context.username} tried to issue moderator command ${msg.trim()} as a normal user.`)
                    return
                }
            }
        }

        // Other commands
        else {
            if (commandParams[0] === commandAlias.get('prefix') + commandAlias.get('suggestion')) {

            }
        }


        // command issued does not exist
        console.log(`* Unknown command ${msg.trim()} issued by ${context.username}`);
    }
}

// Function called when the "dice" command is issued
function rollDice(num, sides) {
    var rolls = [];

    for (i = 0; i < num; i++) {
        rolls.push(' ' + (Math.floor(Math.random() * sides) + 1));
    }

    return rolls;
}