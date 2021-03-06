const kickPlayer = require('../lib/kickPlayer');
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    if (params.length < 3) {
        return message.reply('Usage: ' + settings.identifier + 'kick <slug> <player> <reason>');
    } else {
        return message.reply(await kickPlayer(params[0], {
            name: params[1],
            reason: params.slice(2).join(' ')
        }));
    }
}
/**
 * description of the command
 */
const description = "kicks a player";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description
};
