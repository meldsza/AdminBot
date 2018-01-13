const
    bot = require('../bot'),
    settings = require('./../../settings.json');
const isMod = (user, hl) => {
    if (settings.moderators.includes(user.id) && !hl)
        return true;
    else if (settings.owners.includes(user.id))
        return true;
    else return false;
};

module.exports = isMod;
