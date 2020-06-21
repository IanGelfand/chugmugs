const router = require('express').Router()
const {Mug, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const cart = await req.user.getCart()
      res.json(cart)
    } else {
      res.json(req.session.cart || [])
    }
  } catch (error) {
    next(error)
  }
})

router.put('/add', async (req, res, next) => {
  try {
    const mug = await Mug.findByPk(req.body.mugId)
    const cartMug = {
      id: mug.id,
      title: mug.title,
      price: mug.price,
      capacity: mug.capacity,
      material: mug.material,
      imgUrl: mug.imgUrl,
      quantity: 1
    }

    if (req.user) await req.user.addMugToCart(mug)
    else {
      if (!req.session.cart) req.session.cart = []

      req.session.cart.push(cartMug)
    }

    res.json(cartMug)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    if (req.user) {
      const cart = await User.findByPk(req.body.cartId)
      const mug = await Mug.findByPk(req.body.mugId)
      cart.delete(mug)
      res.json(cart)
    }
  } catch (error) {
    console.log('Error in the delete item from cart route', error)
    next(error)
  }
})
