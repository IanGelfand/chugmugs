const crypto = require('crypto')
const Sequelize = require('sequelize')
const Order = require('./order')
require('../models/index')
const db = require('../db')

const User = db.define('user', {
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: true
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: true
  },
  imgUrl: {
    type: Sequelize.TEXT,
    defaultValue: 'https://bit.ly/37Lab4d'
  },
  cartId: {
    type: Sequelize.INTEGER
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING
  }
})

module.exports = User

User.prototype.getCart = async function() {
  if (!this.cartId) {
    return []
  }
  const cart = await Order.findByPk(this.cartId)
  const cartMugs = await cart.getMugs()
  console.log('getCart method:', cartMugs)
  for (let i = 0; i < cartMugs.length; i++) {
    cartMugs[i].quantity = 5
    //cartMugs[i].dataValues.mugOrder.dataValues.quantity;
  }
  return cartMugs
}

User.prototype.addMugToCart = async function(mug) {
  if (!this.cartId) {
    console.log('creating user cart')
    let cart = await Order.create()
    console.log('created new cart', cart, cart.id)
    cart.addMug(mug)
    console.log('added mug cart', cart)
    cart.setUser(this)
    console.log('set cart to user', cart, this)
    this.update({cartId: cart.id})
    console.log('set cartId', this.cartId)
  } else {
    let cart = await Order.findByPk(this.cartId)
    console.log('fetched user cart', cart)
    cart.addMug(mug)
    console.log('added mug to existing user cart', cart)
  }
}

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

/**
 * classMethods
 */
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
User.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword)
})
