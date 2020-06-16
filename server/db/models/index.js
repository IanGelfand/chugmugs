const User = require('./user')
const Mug = require('./mug')

User.belongsToMany(Mug, {through: 'order'})
Mug.belongsToMany(User, {through: 'order'})

User.hasMany(Mug)
Mug.hasMany(User)

module.exports = {
  User,
  Mug
}
