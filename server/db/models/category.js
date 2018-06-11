const db = require('../db.js')
const Sequelize = require('sequelize')

const Category = db.define('category', {
   name: {
     type: Sequelize.STRING,
     unique: true,
    }
})


 module.exports = Category
