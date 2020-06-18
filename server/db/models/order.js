const Sequelize = require('sequelize')
require('../models/index')
const db = require('../db')

const Order = db.define('order', {
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Order
