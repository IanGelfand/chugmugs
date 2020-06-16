const User = require('./user')
const Mug = require('./mug')

User.belongsToMany(Mug, {through: 'order'})
Mug.belongsToMany(User, {through: 'order'})

module.exports = {
  User,
  Mug
}
