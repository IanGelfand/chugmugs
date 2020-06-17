const Sequelize = require('sequelize')
const db = require('../db')

const Mug = db.define('mug', {
  title: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  color: {
    type: Sequelize.STRING,
    allowNull: true
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  capacity: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  material: {
    type: Sequelize.STRING,
    allowNull: true
  },
  imgUrl: {
    type: Sequelize.TEXT,
    defaultValue: 'https://bit.ly/2UK0HRl'
  }
})

module.exports = Mug
