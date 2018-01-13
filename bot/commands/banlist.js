const banlist = require('../lib/banlist');
const settings  = require('../../settings');

/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    if (params.length < 1) {
        return message.reply('Usage: ' + settings.identifier + 'banlist <slug>');
    } else {
        return message.reply(await banlist(params[0]).then(list));
    }
}
/**
 * description of the command
 */
const list = (l)=>
{
    let res = [];
    for(let i=0;i<l.length;i++)
        res.push(l[i].name)
};
const description = "display banlist";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description
};
