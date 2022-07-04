require("dotenv").config();
const { Sequelize } = require("sequelize");

console.log("Succesfully connected to db");
exports.sequelize = new Sequelize(process.env.DATABASE_URI);