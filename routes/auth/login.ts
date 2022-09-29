import { Application } from "express";
import { ValidationError } from "sequelize";
import { ApiException } from "../../types/exception";
import { userTypes } from "../../types/user";
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User } = require('../../database/connect')

/**
 * @swagger
 * tags:
 *      name: Authentification
 *      description: Manage authentification
 */

/**
  * @openapi
  * /api/auth/login:
  *  post:
  *      tags: [Authentification]
  *      description: Login
  *      consumes:
  *       - application/json
  *      parameters:
  *       - name: JSON
  *         in: body
  *         required: true
  *         type: object
  *         default: {"username": "string", "password": "string"}
  *      responses:
  *        200:
  *          description: Returns tokens.
  */
module.exports = (app: Application) => {
  app.post("/api/auth/login", (req, res) => {

    User.findAll()
    .then(async (users: any) => {

        const user = users.find((user : userTypes) => user.username == req.body.username)
        
        if (user == null) {
            return res.status(400).send('Cannot find user')
        }
        let message : string = ''
        if (await bcrypt.compare(req.body.password, user.password)) {
            message = "Bon mot de passe"
            const accessToken = jwt.sign({ name: user.username }, process.env.ACCESS_TOKEN_SECRET)
            const refreshToken = jwt.sign({ name: user.username }, process.env.REFRESH_TOKEN_SECRET)
            // refreshTokens.push(refreshToken)
            return res.json({accessToken: accessToken, refreshToken: refreshToken})
        } else {
            message = "Mauvais mot de passe"
        }
        res.json(message)
    })
    .catch((error : ApiException) => {
            const message = `La liste des users n'a pas pu être récupérée. Réessayer dans quelques instants.`
            res.status(500).json({message, data : error})
        })

    })
};
