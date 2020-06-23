const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')
const Order = require('./order')
const Mug = require('./mug')
const MugOrder = require('./mugOrder')

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
    allowNull: true,
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

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

User.prototype.getCart = async function() {
  const cart = await Order.findOne({where: {completed: false, userId: this.id}})

  if (!cart) return []

  const cartMugs = await cart.getMugs()

  return cartMugs.map(mug => ({
    id: mug.dataValues.id,
    title: mug.dataValues.title,
    color: mug.dataValues.color,
    price: mug.dataValues.price,
    capacity: mug.dataValues.capacity,
    description: mug.dataValues.description,
    imgUrl: mug.dataValues.imgUrl,
    quantity: mug.dataValues.mugOrder.dataValues.quantity
  }))
}

User.prototype.addMugToCart = async function(mug) {
  const cart = await Order.findOne({where: {completed: false, userId: this.id}})

  if (!cart) {
    const newCart = await Order.create({userId: this.id})
    newCart.addMug(mug, {through: {price: mug.price}})
  } else {
    const mugInCart = await MugOrder.findOne({
      where: {orderId: cart.id, mugId: mug.id}
    })

    if (mugInCart) {
      mugInCart.update({quantity: mugInCart.quantity + 1})
    } else {
      cart.addMug(mug, {through: {price: mug.price}})
    }
  }
}

User.prototype.mergeGuestCart = async function(sessionCart) {
  for (let mug in sessionCart) {
    if (sessionCart[mug]) {
      const cartMug = await Mug.findByPk(+mug)
      for (let i = 1; i <= sessionCart[mug].quantity; i++) {
        await this.addMugToCart(cartMug)
      }
    }
  }
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
