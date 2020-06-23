const router = require('express').Router()
const {User} = require('../db/models')
const {adminsOnly} = require('../accessChecks')
module.exports = router

router.get('/', adminsOnly, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: [
        'id',
        'isAdmin',
        'email',
        'firstName',
        'lastName',
        'imgUrl',
        'googleId'
      ]
    })

    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', adminsOnly, async (req, res, next) => {
  try {
    const user = await User.findOne({
      attributes: [
        'id',
        'isAdmin',
        'email',
        'firstName',
        'lastName',
        'imgUrl',
        'googleId'
      ],
      where: {
        id: req.params.id
      }
    })

    res.json(user)
  } catch (error) {
    next(error)
  }
})
