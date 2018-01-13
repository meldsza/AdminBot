const restart = require('../lib/restart');
const settings  = require('../../settings');
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    if (params.length < 1) {
        return message.reply('Usage: ' + settings.identifier + 'restart <slug>');
    } else {
        return restart(params[0]);
    }
}
/**
 * description of the command
 */
const description = "restarts a server";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description
};
