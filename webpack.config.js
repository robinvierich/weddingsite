var path = require('path')
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {

    context: __dirname,

    resolve: {
        modules: [
            'node_modules',
            'node_modules/foundation-sites/scss',
            'js',
            '.'
        ]
    },

    entry: {
        main: 'main.js'
    },

    output: {
        path: path.resolve(__dirname, 'doc'),
        filename: '[name].bundle.js'
    },

    plugins: [
        new CopyWebpackPlugin([
            { from: 'images', to: 'images/' },
            { from: 'fonts', to: 'fonts/' },
            { from: 'index.html' }
        ])
    ],

    externals: {
        //jQuery: 'jQuery'
        foundation: 'Foundation'
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'},
                    {loader: 'postcss-loader'},
                    {loader: 'sass-loader'},
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {loader: 'raw-loader'},
                ]
            }
        ],
    }
}