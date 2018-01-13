getPlayers = require('./getPlayers');
module.exports = (slug, options, port) => {
    const rcon = new bf2.rcon({
        host: slug,
        port: port || 4711
    });
    options.index = getPlayers(slug).then(p => p.find((player) => {
        if (player.name === options.name)
            return player.index;
    }));
    options.index.then((index) => {
        return new Promise(
            (resolve, reject) => {
                rcon.on('authFail', reject);
                rcon.on("authSucess", function () {
                    userlist = [];
                    this.send("exec bm", function (data) {
                        data = data.toString();
                        resolve(data);
                    });
                });
            }
        )
    });
};