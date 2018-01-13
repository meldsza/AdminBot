const xml = require('./xml');
const bf2 = require ('./rcon');
module.exports = (slug, options, port) => {
    const rcon = new bf2.rcon({
        host: slug,
        port: port || 4711
    });
    return new Promise(
        (resolve, reject) => {
            rcon.on('authFail', reject);
            rcon.on("authSucess", function () {
                userlist = [];
                this.send("exec banlist", function (data) {
                    data = data.toString();
                    data = xml(data);
                    data = data.then((b) => {
                        if (typeof b.banlist === 'string')
                            throw new Error("Banlist empty");
                        else
                            return b;
                    }).then(x => x.banlist.ban);
                    data.then(d => resolve(d))
                });
            });
        }
    );
};
