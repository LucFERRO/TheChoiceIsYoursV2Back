require('dotenv').config()

const cors = require('cors')
const express = require("express")

const app = express()

app.use(cors())

import { ApiException } from './types/exception'
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const sequelize = require('./database/connect')

import {Response, Request} from 'express'

app.use(express.json())


// Pour créer DB, à commenter sinon
// sequelize.initDb()

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}...`)
})

app.get("/", (req : Request, res : Response) => {
    res.send("SWAGGER : /api/docs")
})
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'The Choice Is Yours API',
            description: 'Red or Blue',
            contact: {
                name: 'Best front-end dev EUW'
            },
            // servers: [{ url: '/api' }]
            servers: [{
                url:`http://localhost:${port}`,
                description: 'localhost'
            },],
        },
    },
    apis: [`./routes/*/*.ts`]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

require('./routes/users/findAllUsers')(app)
require('./routes/users/findUserByPk')(app)
require('./routes/users/createUser')(app)
require('./routes/users/updateUser')(app)
require('./routes/users/deleteUser')(app)

require('./routes/auth/login')(app)

app.use(({res : ApiException}: any) => {
    const message = 'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.'
    return ApiException.status(404).json({message})
})