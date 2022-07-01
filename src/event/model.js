const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");


const Event = sequelize.define("Event", {
    event_id: {
        type: DataTypes.INTEGER,
        unique: true,
    }, 
    attendees: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        // defaultValue: "[]",
    },
}
)

module.exports = Event; 

