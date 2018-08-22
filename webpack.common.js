const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: path.resolve(__dirname, 'node_modules')
            },
            {
                test: /\.(jpg|jpeg|png|gif|svg)$/,
                use: ['url-loader?limit=8192']
            }
        ]
    },
    plugins: [
        new cleanWebpackPlugin(['./dist']),
        new htmlWebpackPlugin({
            title: '知乎日报React版',
            template: './src/index.html'
        })
    ]
}