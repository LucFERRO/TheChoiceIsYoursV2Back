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
  *      description: Simulate succesfull login
  *      consumes:
  *       - application/json
  *      parameters:
  *       - name: JSON
  *         in: body
  *         required: true
  *         type: object
  *         default: {"username": "string"}
  *      responses:
  *        200:
  *          description: Returns tokens.
  */
module.exports = (app: Application) => {
  app.post("/api/auth/login", (req, res) => {
    const username = req.body.username
    const user = { name: username }

    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    // refreshTokens.push(refreshToken)
    res.json({accessToken: accessToken, refreshToken: refreshToken})
  });
};

function generateAccessToken(user : any) {
    // return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30s'})
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
}