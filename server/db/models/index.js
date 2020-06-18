const User = require('./user')
const Mug = require('./mug')
const Order = require('./order')
const MugOrder = require('./mugOrder')

Order.belongsTo(User)
User.hasMany(Order)

Order.belongsToMany(Mug, {through: 'MugOrder'})
Mug.belongsToMany(Order, {through: 'Order'})

module.exports = {
  User,
  Mug,
  MugOrder
}
