const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common');
const uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const extractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = merge(common, {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: extractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
            },
            {
                test: /\.scss$/,
                use: extractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new uglifyjsWebpackPlugin(),
        new extractTextWebpackPlugin('styles/style.css')
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
})