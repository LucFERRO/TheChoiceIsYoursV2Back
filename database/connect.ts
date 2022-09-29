import { DataTypes } from "sequelize"
import { userTypes } from "../types/user"
let users = require('../database/mock-user')
const {Sequelize} = require('sequelize')
const UserModel = require('../models/users')

const sequelize = new Sequelize (
    'TheChoiceIsYoursSequelize',
    'neo',
    'neoneo',
    {
        host:'localhost',
        dialect:'postgres',
        port: 5432,
        dialectOptions: {
            timezone: 'Etc/GMT-2'
        }
    }
)

sequelize.authenticate()
    .then(() => console.log("La connextion à la base de donnée à bien était établie"))
    .catch((error : Error) => console.error(`Impossible de se connecter à la base de données ${error}`)
    )

const User = UserModel(sequelize, DataTypes)

    
const initDb = () => {

        return sequelize.sync({force: true}).then(()=> {
            
            users.map((user: userTypes) => {
                User.create({
                    username: user.username,
                    password: user.password,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    date_of_birth: user.date_of_birth,
                    email: user.email,
                    biography: user.biography,
                    profile_picture: user.profile_picture
                }).then((response: { toJSON: () => string }) => console.log(response.toJSON()))
            })
            console.log('La base de données user a bien été initialisée !')
    })
}


module.exports = {
    initDb, User
}