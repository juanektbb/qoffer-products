import express from 'express'
import webpack from 'webpack'
import bodyParser from 'body-parser'
import webpackConfig from '../../webpack.config.js'
import webpackDevMiddleware from 'webpack-dev-middleware'

import pool from "./shared/database.js"

import MainRouter from './routes/main.route.js'

const fileUpload = require('express-fileupload');
const cors = require('cors');



const app = express()
const port = process.env.PORT || 3000;



//Middlewares
app.use(webpackDevMiddleware(webpack(webpackConfig)))

app.use(fileUpload({
    createParentPath: true
}));

app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use("/api", MainRouter)

app.listen(port, () => {
    console.log("Server running on port: " + port)
})