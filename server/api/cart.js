const router = require('express').Router()
const {Mug, Order, MugOrder} = require('../db/models')
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

router.put('/add', async (req, res, next) => {
  try {
    const mug = await Mug.findByPk(req.body.mugId)

    const cartMug = {
      id: mug.dataValues.id,
      title: mug.dataValues.title,
      color: mug.dataValues.color,
      price: mug.dataValues.price,
      capacity: mug.dataValues.capacity,
      description: mug.dataValues.description,
      imgUrl: mug.dataValues.imgUrl
    }

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

router.put('/update/:mugId', async (req, res, next) => {
  try {
    if (req.user) {
      const mugInCart = await MugOrder.findOne({
        where: {orderId: req.user.cartId, mugId: req.params.mugId}
      })

      mugInCart.update({quantity: mugInCart.quantity + req.body.change})

      res.json(req.params.mugId)
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:mugId', async (req, res, next) => {
  try {
    if (req.user) {
      const cart = await Order.findByPk(req.user.cartId)
      const mug = await Mug.findByPk(req.params.mugId)
      cart.removeMug(mug)
      res.json(req.params.mugId)
      // } else {
      //   console.log('In the guest cart')
    }
  } catch (error) {
    console.log('Error in the delete item from cart route', error)
    next(error)
  }
})

router.put('/checkout', async (req, res, next) => {
  try {
    if (req.user) {
      const cart = await Order.findByPk(req.user.cartId)

      cart.update({completed: true})

      let newCart = await Order.create({userId: req.user.id})

      req.user.update({cartId: newCart.id})
    }
  } catch (error) {
    console.log('Error in the checkout cart route', error)
    next(error)
  }
})
