import express from 'express'
import webpack from 'webpack'
import cors from 'cors'
import bodyParser from 'body-parser'
import fileUpload from 'express-fileupload'
import webpackConfig from '../../webpack.config.js'
import webpackDevMiddleware from 'webpack-dev-middleware'

import graphQLConfig from './shared/graphql.js'
import MainRouter from './routes/main.route.js'

const app = express()
const port = process.env.PORT || 3000;

//Middlewares
app.use(webpackDevMiddleware(webpack(webpackConfig)))

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(fileUpload({ createParentPath: true }))

//Routes
app.use("/api", MainRouter)
app.use("/graphql", graphQLConfig)

app.listen(port, () => {
    console.log("Server running on port: " + port)
})