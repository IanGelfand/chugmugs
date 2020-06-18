const router = require('express').Router()
const {User, Order, Mug, MugOrder} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    console.log('req user', req.user.cartId)
    console.log('fetching req user cart')
    // const user = await User.findOne({where:{email: 'ian@email.com'}});
    // console.log('not req user', user.cartId);
    //     const cart = await user.getCart();
    //     res.json(cart);
    if (req.user) {
      console.log('fetching req user cart')
      const cart = await req.user.getCart()
      res.json(cart)
    } else {
      console.log('fetching session cart')
      res.json(req.session.cart || [])
    }
  } catch (error) {
    next(error)
  }
})

router.post('/add', async (req, res, next) => {
  try {
    console.log('req user', req.user)
    const mug = await Mug.findByPk(req.body.mugId)
    console.log('created mug to add', mug)
    // if (req.user) {
    const user = await User.findOne({where: {email: 'ian@email.com'}})

    console.log('adding mug to user cart', user)
    await user.addMugToCart(mug)
    console.log('added mug to user cart', user)

    //    res.json(addedItem);
    // } else {
    //     console.log('adding mug to guest session cart');
    //     if (!req.session.cart) {

    //         req.session.cart = [];
    //         console.log('creating session cart', req.session.cart);
    //     }

    //     req.session.cart.push(mug);
    //     console.log('added to session cart', req.session.cart);
    // };
  } catch (error) {
    next(error)
  }
})
