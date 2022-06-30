const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

const Event = sequelize.define("Event", { 
    eventName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

},

);

// (async () => {
//     await sequelize.sync({ force: true });
//     // Code here
//   })();

module.exports = Event;