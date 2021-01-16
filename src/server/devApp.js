import app from './server.js'

import webpack from 'webpack'
import webpackConfig from '../../webpack.config.js'
import webpackDevMiddleware from 'webpack-dev-middleware'

const port = process.env.PORT || 3000;

app.use(webpackDevMiddleware(webpack(webpackConfig)))

app.listen(port, () => {
    console.log("Server running on port: " + port)
})