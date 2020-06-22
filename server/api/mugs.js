const router = require('express').Router()
const {Mug, User} = require('../db/models')
const {adminsOnly} = require('../accessChecks')
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
    if (singleMug) res.json(singleMug)
    else res.status(404).send('Sorry, this mug is not in our inventory :(')
  } catch (err) {
    next(err)
  }
})

router.post('/', adminsOnly, async (req, res, next) => {
  try {
    const singleMug = await Mug.create(req.body)
    res.json(singleMug)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', adminsOnly, async (req, res, next) => {
  try {
    const singleMug = await Mug.findByPk(req.params.id)
    await singleMug.update(req.body)
    res.json(singleMug)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', adminsOnly, async (req, res, next) => {
  try {
    const singleMug = await Mug.findByPk(req.params.id)
    await singleMug.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
