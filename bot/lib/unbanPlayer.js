const banlist = require('./banlist');
const bf2 = require ('./rcon');
module.exports = (slug, name, port) => {
    const rcon = new bf2.rcon({
        host: slug,
        port: port || 4711
    });
    index = getPlayers(slug).then(p => p.find((player) => {
        if (player.name === name)
            return player.index;
    }));
    index.then((index) => {
        return new Promise(
            (resolve, reject) => {
                rcon.on('authFail', reject);
                rcon.on("authSucess", function () {
                    userlist = [];
                    this.send("exec unban " + index, function (data) {
                        data = data.toString();
                        resolve(data);
                    });
                });
            }
        )
    });
};
