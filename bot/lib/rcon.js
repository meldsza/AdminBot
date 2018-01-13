/**
 * Taken and modified from https://gist.github.com/ArmedGuy/7082803
 */
var net = require('net');
var crypto = require('crypto');
var util = require('util');
var events = require('events');
const settings = require('./../../settings.json');
const ip_reg = new RegExp("^[0-9\.]");
const slug2ip = require('./slug2ip');
function rcon(options) {
    $rcon = this;
    if (!ip_reg.test(options.host))
        options.host = slug2ip(options.host);
    this.client = net.connect(
        {
            host: options.host,
            port: settings.port || options.port
        }, function () {
            console.log("Connected!");
        }
    );
    this.client.on('data', function (data) {
        var sent = data.toString();
        if (sent.indexOf('### Digest seed: ') != -1) {
            var seed = sent.replace("### Digest seed: ", "").trim();
            console.log("seed: " + seed);
            $rcon.client.write("login " + crypto.createHash('md5').update(seed + settings.password).digest('hex') + "\n");
        }
        if (sent.indexOf('Authentication successful') != -1) {
            $rcon.emit('authSucess');
        }
        if (sent.indexOf('Authentication failed') != -1) {
            $rcon.emit('authFail');
        }
    });
}
util.inherits(rcon, events.EventEmitter);
rcon.prototype.send = function (data, callback) {
    this.client.write(data + "\n");
    this.client.once("data", function (data) {
        callback(data);
    });
}
exports.rcon = rcon;
