import { Application } from "express";
import { ValidationError } from "sequelize";
import { ApiException } from "../../types/exception";
import { userTypes } from "../../types/user";
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User } = require('../../database/connect')

let refreshTokens : any = ['eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiWnVsIiwiaWF0IjoxNjY0Nzg2ODMyfQ.oXdMRVtXuigBJhQics70gaoMohXmK4bYIGZG-yUrstA']

/**
  * @openapi
  * /api/auth/token:
  *  post:
  *      tags: [Authentification]
  *      description: Token
  *      consumes:
  *       - application/json
  *      parameters:
  *       - name: JSON
  *         in: body
  *         required: true
  *         type: object
  *         default: {"token": "string"}
  *      responses:
  *        200:
  *          description: Token. Refresh tokens.
  */
module.exports = (app: Application) => {
    app.post("/api/auth/token", (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err : Error, user : any) => {
        if (err) return res.sendStatus(403)
        const accessToken = jwt.sign({name: user.username}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15s'})
        res.json({accessToken: accessToken})
        })
    })
};
