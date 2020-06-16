const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  const userId = req.body.id
  try {
    await userId.update(req.body, {where: {id: userId}})
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findOne({
      attributes: ['id', 'email'],
      where: {
        id: req.params.id
      }
    })
    res.json(user)
  } catch (error) {
    next(error)
  }
})
