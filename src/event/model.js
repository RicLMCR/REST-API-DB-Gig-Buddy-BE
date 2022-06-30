const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");


const Event = sequelize.define("Event", {
    event_name: {
        type: DataTypes.STRING
    }, 
    venue_name: {
        type: DataTypes.STRING
    },
    venue_address: {
        type:DataTypes.STRING
    },
    venue_town: {
        type:DataTypes.STRING
    },
    venue_postcode: {
        type:DataTypes.STRING
    },
    venue_country: {
        type: DataTypes.STRING
    },
    date: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    start_date: {
        type: DataTypes.STRING, //Not INT as API has letter T for time in JSON
        allowNull:false
    },
    end_date:  {
        type: DataTypes.STRING, //Not INT as API has letter T for time in JSON
        allowNull:false
    },
    description: {
        type:DataTypes.STRING
    },
    attendies: {
        type:DataTypes.STRING
    }
}
)



// (async () => {
//     await sequelize.sync({ force: true });
//     // Code here
//   })();

module.exports = Event; 