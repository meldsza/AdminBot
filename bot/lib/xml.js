const xml2js = require('xml2js');

const xp = (xml) => new Promise((resolve, reject) => xml2js.parseString(xml, (err, result) => err ? reject(err) : resolve(result)));

module.exports = xp;
