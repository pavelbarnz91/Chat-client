const path = require('path');
const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
    mode: 'development',

    devServer: {
        static: {
            directory: path.join(__dirname, 'src')
        },
        compress: true,
        port: 9000,
    },
});