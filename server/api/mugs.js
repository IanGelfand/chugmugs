const router = require('express').Router()
const {Mug, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const mugs = await Mug.findAll()
    res.json(mugs)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const singleMug = await Mug.findByPk(req.params.id)
    singleMug
      ? res.json(singleMug)
      : res.status(404).send('Sorry, this mug is not in our inventory :(')
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  if (User.isAdmin) {
    try {
      const singleMug = await Mug.create(req.body)
      res.json(singleMug)
    } catch (err) {
      next(err)
    }
  } else {
    res.send('Sorry, you are not authorized to list mugs :(')
  }
})

// Not sure whether I need to add the
router.put('/:id', async (req, res, next) => {
  try {
    const singleMug = await Mug.findByPk(req.params.id)
    await singleMug.update(req.body)
    res.json(singleMug)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  if (User.isAdmin) {
    try {
      const singleMug = await Mug.findByPk(req.params.id)
      await singleMug.destroy()
      res.sendStatus(204)
    } catch (err) {
      next(err)
    }
  } else {
    res.send('Sorry, you are not authorized to remove mugs :(')
  }
})
