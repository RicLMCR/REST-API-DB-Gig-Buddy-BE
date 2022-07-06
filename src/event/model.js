const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");


const Event = sequelize.define("Event", {
    eventId: {
        type: DataTypes.STRING, // String as skiddle api stores eventId as a string
        unique: true,
    }, 
    attendees: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: []
    },
}
)

module.exports = Event; 

