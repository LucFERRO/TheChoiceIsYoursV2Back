
import {  DataTypes, Sequelize, STRING } from "sequelize"


module.exports = (sequelize : Sequelize, dataTypes : typeof DataTypes) => {
    return sequelize.define('User', {

    id: {
       type: dataTypes.INTEGER,
       autoIncrement: true,
       primaryKey: true, 
    },
    username: {
        type: dataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg : 'Veuillez entrer votre pseudo cette valeur est requise'},
            notEmpty : {msg : 'Le pseudo ne peut être vide'}
        }
    },
    password: {
        type: dataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg : 'Veuillez entrer votre mot de passe cette valeur est requise'},
            notEmpty : {msg : 'Le mot de passe ne peut être vide'}
        }
    },
    firstname: {
        type: dataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg : 'Veuillez entrer votre prénom cette valeur est requise'},
            notEmpty : {msg : 'Le prénom ne peut être vide'}
        }
    },
    lastname: {
        type: dataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg : 'Veuillez entrer votre nom cette valeur est requise'},
            notEmpty : {msg : 'Le nom ne peut être vide'}
        }
    },
    date_of_birth: {
        type: dataTypes.STRING,
        allowNull: false,
        // validate: {
        //     notNull: { msg : 'Veuillez entrer votre nom cette valeur est requise'},
        //     notEmpty : {msg : 'Le nom ne peut être vide'}
        // }
    },
    email: {
        type: dataTypes.STRING,
        allowNull: false,
        unique: true,
        validate : {
            isEmail:true, 
            notNull: {msg : "L'email est requis"},
            notEmpty: {msg : "L'email est une propriété requise"}


        }
    },
    biography: {
        type: dataTypes.STRING,
    },
    profile_picture: {
        type: dataTypes.STRING,
        // validate : {
        //     isUrl:true
        // }
    }, 
})
}
