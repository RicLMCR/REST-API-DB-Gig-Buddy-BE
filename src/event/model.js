const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");


const Event = sequelize.define("Event", {
    event_id: {
        type: DataTypes.INTEGER,
        unique: true,
    }, 
    attendees: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: []
    },
}
)

module.exports = Event; 

