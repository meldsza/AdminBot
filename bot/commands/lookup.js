const lookup = require('../lib/lookup')
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    return lookup(params[0],message);
}
/**
 * description of the command
 */
const description = "Looks for alias of a player";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description
};
