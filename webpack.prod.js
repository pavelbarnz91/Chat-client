const path = require('path');
const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');
const CSSMinimizerWPPlugin = require('css-minimizer-webpack-plugin');
const TerserWPPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',

    optimization: {
        minimize: true,
        minimizer: [
            new CSSMinimizerWPPlugin(),
            new TerserWPPlugin(),
        ]
    }
});