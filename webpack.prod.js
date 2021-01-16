import webpack from 'webpack'
import htmlWebpackPlugin from 'html-webpack-plugin'
import LiveReloadPlugin from '@kooneko/livereload-webpack-plugin' //This package resolved compatibility issues

export default {
    mode: "production",
    entry: './src/client/index.js',
    output: {
        path: './dist',
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
            template: './src/client/index.html'
        }),
        new LiveReloadPlugin()
    ]
}