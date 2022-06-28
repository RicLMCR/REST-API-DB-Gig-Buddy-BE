const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

const User = sequelize.define("User", { 
    Username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        defaultValue: "Not specified",
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: { len: [7,255] }
    },
    firstname: {
        type: DateTypes.STRING,
        allowNull: false,
    },
    surename: {
        type: DateTypes.STRING,
        allowNull: false,
    },
    concerts: {
        type: DateTypes.STRING,
    }, 
    buddies: {
        type: DateTypes.STRING,
    }
})

module.exports = User;