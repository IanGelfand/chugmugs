const Sequelize = require('sequelize')
const db = require('../db')

const MugOrder = db.define('mugOrder', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  price: {
    type: Sequelize.INTEGER
  }
})

module.exports = MugOrder
