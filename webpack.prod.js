module.exports = {
    mode: "production",
    entry: './src/client/index.js',
    output: {
        path: __dirname + '/../../public/client/',
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
    }
}