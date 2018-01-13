const banPlayer = require('../lib/banPlayer');
const settings  = require('../../settings');
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    if (params.length < 4) {
        return message.reply('Usage: ' + settings.identifier + 'ban <slug> <duration in s> <player> <reason>');
    } else {
        return message.reply(await banPlayer(params[0], {
            duration: params[1],
            name: params[2],
            reason: params.slice(3).join(' ')
        }));
    }
}
/**
 * description of the command
 */
const description = "bans a player";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description
};
