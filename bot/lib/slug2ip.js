module.exports = (slug) => {
    return slugs[slug];
}
const slugs = require('./../../settings.json').slugs