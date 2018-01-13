const unbanPlayer = require('../lib/unbanPlayer');

const settings = require('../../settings');
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    if (params.length < 2) {
        return message.reply('Usage: ' + settings.identifier + 'unban <slug> <player>');
    } else {
        return message.reply(await unbanPlayer(params[0], params[1]));
    }
}
/**
 * description of the command
 */
const description = "unbans a player";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description
};
