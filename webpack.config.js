const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const LiveReloadPlugin = require('@kooneko/livereload-webpack-plugin') //This package resolved compatibility issues

module.exports = {
    mode: 'development',
    entry: './src/client/index.js',
    output: {
        path: __dirname + '/public/client/',
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                use: ['style-loader', 'css-loader'],
                test: /\.css$/
            },
            {
                test: /\.(jpg|png)$/,
                use: {
                    loader: 'url-loader',
                }
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './public/index.html'
        }),
        new LiveReloadPlugin()
    ]
}