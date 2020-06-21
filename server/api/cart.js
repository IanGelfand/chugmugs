const router = require('express').Router()
const {Mug} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const cart = await req.user.getCart()
      res.json(cart)
    }
    // else {
    //   res.json(req.session.cart || [])
    // }
  } catch (error) {
    next(error)
  }
})

router.put('/add/:id', async (req, res, next) => {
  try {
    const mug = await Mug.findByPk(req.params.id)
    console.log('mug to add', mug)
    const cartMug = {
      id: mug.dataValues.id,
      title: mug.dataValues.title,
      price: mug.dataValues.price,
      capacity: mug.dataValues.capacity,
      material: mug.dataValues.material,
      imgUrl: mug.dataValues.imgUrl,
      quantity: 1
    }
    console.log('formatted mug to add', cartMug)

    if (req.user) await req.user.addMugToCart(mug)
    // else {
    //   if (!req.session.cart) req.session.cart = []

    //   req.session.cart.push(cartMug)
    // }

    res.json(cartMug)
  } catch (error) {
    next(error)
  }
})
