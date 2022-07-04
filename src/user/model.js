const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

const User = sequelize.define("User", { 
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: { len: [7,255] } // wont work when passwords are hashed
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "Not specified",
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "Not specified",
    },
    events_attending: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
    }, 
    buddies: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "No buddies",
    }

});

module.exports = User; 