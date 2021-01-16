import express from 'express'

import cors from 'cors'
import bodyParser from 'body-parser'
import fileUpload from 'express-fileupload'


import graphQLConfig from './shared/graphql.js'
import MainRouter from './routes/main.route.js'

const app = express()


//Middlewares
if(process.env.NODE_ENV == 'dev'){
    
    
    

}



app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(fileUpload({ createParentPath: true }))

//Routes
app.use("/api", MainRouter)
app.use("/graphql", graphQLConfig)

export default app