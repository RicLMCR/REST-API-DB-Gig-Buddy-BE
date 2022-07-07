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
    imageUrl: {
        type:DataTypes.STRING,
        allowNull: true,
        defaultValue: "Not specified",
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
    eventsAttending: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
    }, 
    buddies: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
    },
    buddyRequests: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
    }

});

module.exports = User