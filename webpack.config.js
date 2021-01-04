import webpack from 'webpack'
import htmlWebpackPlugin from 'html-webpack-plugin'
import LiveReloadPlugin from '@kooneko/livereload-webpack-plugin' //This package resolved compatibility issues

export default {
    mode: "development",
    entry: './src/client/index.js',
    output: {
        path: '/',
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