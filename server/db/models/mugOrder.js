const Sequelize = require('sequelize')
const db = require('../db')

const MugOrder = db.define('mugOrder', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = MugOrder
