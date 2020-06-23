const Sequelize = require('sequelize')
const db = require('../db')

const Mug = db.define('mug', {
  title: {
    type: Sequelize.STRING,
    // unique: false,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  color: {
    type: Sequelize.ENUM,
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
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  imgUrl: {
    type: Sequelize.TEXT,
    defaultValue: 'https://bit.ly/2UK0HRl'
  }
})

module.exports = Mug
