import app from './server.js'

import webpack from 'webpack'
import webpackConfig from '../../webpack.config.js'
import webpackDevMiddleware from 'webpack-dev-middleware'

app.use(webpackDevMiddleware(webpack(webpackConfig)))

app.listen(app.get('port'), () => {
    console.log("Server running on port: " + app.get('port'))
})