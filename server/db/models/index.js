const User = require('./user')
const Mug = require('./mug')

User.belongsToMany(Mug, {as: 'cart', through: 'UserMug', foreignKey: 'userId'})
Mug.belongsToMany(User, {as: 'users', through: 'UserMug', foreignKey: 'mugId'})

module.exports = {
  User,
  Mug
}
