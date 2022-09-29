import { Application } from "express";
import { UniqueConstraintError, ValidationError } from "sequelize";
import { ApiException } from "../types/exception";
import { userTypes } from "../types/user";

const { User } = require("../database/connect");

/**
 * @swagger
 * tags:
 *      name: Users
 *      description: Manage users
 */

/**
  * @openapi
  * /api/users:
  *  post:
  *      tags: [Users]
  *      description: Add an template
  *      consumes:
  *       - application/json
  *      parameters:
  *       - name: JSON
  *         in: body
  *         required: true
  *         type: object
  *         default: {    "username": "string","password":"string","firstname": "string","lastname": "string","date_of_birth": "date","email": "email","biography": "string","profile_picture": null}
  *      responses:
  *        200:
  *          description: Returns a mysterious string.
  */
module.exports = (app: Application) => {
  app.post("/api/users", (req, res) => {
    User.create(req.body)
      .then((user: userTypes) => {
        const message: string = `Le user ${req.body.name} a bien été crée.`;
        res.json({ message, data: user });
      })
      .catch((error : ApiException) => {
        if(error instanceof ValidationError){
          return res.status(400).json({message: error.message, data : error})
        }
        const message = `L'utilisateur n'a pas pu être ajouté. Réessayer dans quelques instants.`
        res.status(500).json({message, data : error})
    })
  });
};
