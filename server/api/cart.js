const router = require('express').Router()
const {Mug, Order, MugOrder} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const cartMugs = await req.user.getCart()

      res.json(cartMugs)
    } else if (!req.session.cart) res.json([])
    else {
      const sessionCartMugs = []

      for (let mug in req.session.cart) {
        if (req.session.cart[mug])
          sessionCartMugs.push({...req.session.cart[mug]})
      }

      res.json(sessionCartMugs)
    }
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
    else {
      if (!req.session.cart) req.session.cart = {}

      if (!req.session.cart[cartMug.id]) {
        req.session.cart[cartMug.id] = {...cartMug}
        req.session.cart[cartMug.id].quantity = 1
      } else req.session.cart[cartMug.id].quantity++
    }

    res.json(cartMug)
  } catch (error) {
    next(error)
  }
})

router.put('/update/:mugId', async (req, res, next) => {
  try {
    if (req.user) {
      const cart = await Order.findOne({
        where: {completed: false, userId: req.user.id}
      })

      const mugInCart = await MugOrder.findOne({
        where: {orderId: cart.id, mugId: req.params.mugId}
      })

      mugInCart.update({quantity: mugInCart.quantity + req.body.change})
    } else req.session.cart[req.params.mugId].quantity += req.body.change

    res.json(req.params.mugId)
  } catch (error) {
    next(error)
  }
})

router.delete('/:mugId', async (req, res, next) => {
  try {
    if (req.user) {
      const cart = await Order.findOne({
        where: {completed: false, userId: req.user.id}
      })

      const mug = await Mug.findByPk(req.params.mugId)

      cart.removeMug(mug)
    } else req.session.cart[req.params.mugId] = undefined

    res.json(req.params.mugId)
  } catch (error) {
    console.log('Error in the delete item from cart route', error)
    next(error)
  }
})

router.put('/checkout', async (req, res, next) => {
  try {
    if (req.user) {
      const cart = await Order.findOne({
        where: {completed: false, userId: req.user.id}
      })

      cart.update({completed: true})

      await Order.create({userId: req.user.id})
    } else req.session.cart = {}

    res.sendStatus(200)
  } catch (error) {
    console.log('Error in the checkout cart route', error)
    next(error)
  }
})
