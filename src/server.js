import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackConfig from '../webpack.config.js'

const app = express()
const port = process.env.PORT || 3000;

//Middlewares
app.use(webpackDevMiddleware(webpack(webpackConfig)))

app.get("/", (req, res) => {
    res.send("Hello world")
})

app.listen(port, () => {
    console.log("Server running on port: " + port)
})