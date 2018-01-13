const isMod = require('./is_mod');
const rcon = require('./rcon_exec');
const restartServer = (slug, message) => {
    if (!isMod(message.author, true)) {
        message.channel.sendMessage("Only Discord Admins, Moderators and Developers can use this command");
        return;
    }
    rcon(slug, 'admin.nextLevel').then(msg => message.channel.send("Changed Level\n" + msg)).then(() =>
        setTimeout(() => {
            rcon(slug, 'quit').then(msg => message.channel.send("Server Restarted\n" + msg))
        }
            , 15000)
    )
}

module.exports = restartServer;
