const Sequelize = require("sequelize");
require('dotenv').config()
const connection = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_LOGIN,
  process.env.DB_PASS,
  {
    dialect: "mariadb",
    host: process.env.DB_HOST,
    timezone: "-03:00"
  }
);
module.exports = connection;