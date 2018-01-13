const bf2 = require ('./rcon');
module.exports = (slug, command, port) => {
    const rcon = new bf2.rcon({
        host: slug,
        port: port || 4711
    });
    return new Promise(
        (resolve, reject) => {
            rcon.on('authFail', reject);
            rcon.on("authSucess", function () {
                userlist = [];
                this.send("exec " + command, function (data) {
                    data = data.toString();
                    resolve(data);
                });
            });
        }
    );
};
