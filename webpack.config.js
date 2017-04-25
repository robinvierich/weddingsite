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
        path: path.resolve(__dirname, 'docs'),
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
                    {loader: 'resolve-url-loader'},
                    {loader: 'sass-loader'},
                    //{loader: 'postcss-loader'},
                ]
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'file-loader?name=images/[name].[ext]'
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