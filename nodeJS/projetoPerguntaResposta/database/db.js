
const sequelize = require('sequelize')
require('dotenv').config()
const connection = new sequelize(process.env.DB_NAME,process.env.DB_LOGIN,process.env.DB_PASS,{
    host: process.env.DB_HOST,
    dialect:'mariadb'
})

module.exports = connection;