const exec = require('../lib/rcon_exec');
const settings = require('../../settings');
const isMod = require('../lib/is_mod')
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    if (params.length < 2) {
        return message.reply('Usage: ' + settings.identifier + 'exec <slug> <command>');
    } else {
        if (!isMod(message.author, true)) {
            message.channel.send("Only Discord Admins and Developers and Moderators can use this command");
            return;
        }
        return message.reply(await exec(params[0], params.slice(1).join(' ')));
    }
}
/**
 * description of the command
 */
const description = "executes a rcon statement on a server";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description
};
