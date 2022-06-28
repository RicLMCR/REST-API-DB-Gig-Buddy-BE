const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

const User = sequelize.define("User", { 
    username: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        defaultValue: "Not specified",
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
        // validate: { len: [7,255] }
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    concerts: {
        type: DataTypes.STRING,
    }, 
    buddies: {
        type: DataTypes.STRING,
    }
   
},

);

(async () => {
    await sequelize.sync({ force: true });
    // Code here
  })();

module.exports = User;