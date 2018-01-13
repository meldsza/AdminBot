const bf2 = require ('./rcon');
module.exports = (slug, port) => {
    const rcon = new bf2.rcon({
        host: slug,
        port: port || 4711
    });
    return new Promise(
        (resolve, reject) => {
            var usermatch = /Id: \s?([0-9]*) - (.*) is remote ip: ([0-9\.]*):([0-9]*)/g;
            var userlist = [];
            rcon.on('authFail', reject);
            rcon.on("authSucess", function () {
                userlist = [];
                this.send("exec admin.listPlayers", function (data) {
                    data = data.toString();
                    if (!data.includes("is remote ip"))
                        reject("No Players")
                    data = data.split('\n')
                    for (let i = 0; i < data.length; i++) {
                        let match = usermatch.exec(data[i]);
                        userlist.push({
                            id: match[1],
                            name: match[2],
                            ip: match[3],
                            port: match[4]
                        });
                    }
                    resolve(userlist);
                });
            });
        }
    );
}
