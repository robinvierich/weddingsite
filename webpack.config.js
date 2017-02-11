var path = require('path')

module.exports = {

    context: __dirname,

    resolve: {
        modules: [
            'node_modules',
            'js',
            '.'
        ]
    },

    entry: {
        main: 'main.js'
    },

    output: {
        path: path.resolve(__dirname, 'out'),
        filename: '[name].bundle.js'
    },

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