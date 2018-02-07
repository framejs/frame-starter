const autoprefixer = require('autoprefixer');

module.exports = {
    plugins: {
        'postcss-node-sass': {},
        autoprefixer: { browsers: ['last 2 versions', 'iOS >= 8'] }
    }
}