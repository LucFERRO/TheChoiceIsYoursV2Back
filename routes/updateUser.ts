import { Application } from "express";
import { ValidationError } from "sequelize";
import { ApiException } from "../types/exception";
import { userTypes } from "../types/user";

const { User } = require("../database/connect");

/**
  * @openapi
  * /api/users/{id}:
  *  put:
  *      tags: [Users]
  *      description: Update an template
  *      consumes:
  *       - application/json
  *      parameters:
  *       - name: id
  *         in: path
  *         required: true
  *         type: integer
  *         default: 1
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
  app.put("/api/users/:id", (req, res) => {
    const id = req.params.id;
    User.update(req.body, {
      where: { id: id },
    })
      .then(() => {
       return User.findByPk(id).then((user: userTypes) => {
          if (user === null){
            const message = "Le user demandé n'existe pas. Réessayer avec un autre identifiant."
            return res.status(404).json({message})
          }
            const message = `L'utilisateur ${user.username} a bien été modifié.`;
            res.json({ message, data: user });
          })
      })
      .catch((error: ApiException) => {
        if(error instanceof ValidationError){
          return res.status(400).json({message: error.message, data : error})
        }
        const message = `L'utilisateur n'a pas pu être modifié. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
