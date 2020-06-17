const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  if (User.isAdmin) {
    try {
      const users = await User.findAll({
        attributes: ['id', 'email']
      })
      res.json(users)
    } catch (err) {
      next(err)
    }
  } else {
    res.send('Sorry you are not authorized to view this :(')
  }
})

router.put('/', async (req, res, next) => {
  if (User.isAdmin) {
    const userId = req.body.id
    try {
      await userId.update(req.body, {where: {id: userId}})
      res.sendStatus(204)
    } catch (error) {
      next(error)
    }
  } else {
    res.send('Sorry you are not authorized to view this :(')
  }
})

router.get('/:id', async (req, res, next) => {
  if (User.isAdmin) {
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
  } else {
    res.send('Sorry you are not authorized to view this :(')
  }
})
