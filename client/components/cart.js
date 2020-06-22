import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Mug} from '.'
import {
  getCartItemsThunk,
  updateQuantityThunk,
  removeFromCartThunk,
  checkoutCartThunk
} from '../store/userCart'
import history from '../history'

class Cart extends Component {
  componentDidMount() {
    this.props.loadCart()
  }

  render() {
    const {cart, checkoutMugs, updateQuantity, removeMugFromCart} = this.props

    const mugs = []

    for (let mug in cart) {
      if (cart[mug]) {
        mugs.push({
          id: +mug,
          title: cart[mug].title,
          price: cart[mug].price,
          imgUrl: cart[mug].imgUrl,
          quantity: cart[mug].quantity
        })
      }
    }

    let totalMugs = mugs.reduce((sum, mug) => sum + mug.quantity, 0)

    let totalPrice = mugs.reduce(
      (sum, mug) => sum + mug.price * mug.quantity,
      0
    )

    return (
      <React.Fragment>
        <h3>Your Shopping Cart</h3>
        {!totalMugs ? (
          <h1>Your Cart Is Empty</h1>
        ) : (
          <React.Fragment>
            <div id="cart-list">
              {mugs.map(mug => (
                <React.Fragment key={mug.id}>
                  <Mug {...mug} />
                  <div>
                    <span>Quantity: </span>
                    <span
                      onClick={() => {
                        if (mug.quantity <= 1) removeMugFromCart(mug.id)
                        else updateQuantity(mug.id, -1)
                      }}
                    >
                      -
                    </span>
                    _{mug.quantity}_
                    <span onClick={() => updateQuantity(mug.id, 1)}> + </span>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => removeMugFromCart(mug.id)}
                    >
                      Remove Mug From Cart
                    </button>
                  </div>
                </React.Fragment>
              ))}
            </div>
            <div>
              <h5>Your Total is: ${totalPrice}</h5>
            </div>
            <div>
              <button
                type="button"
                onClick={() => {
                  checkoutMugs()
                  history.push('/checkout')
                }}
              >
                Checkout
              </button>
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}

const mapState = state => {
  return {
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    loadCart() {
      dispatch(getCartItemsThunk())
    },
    updateQuantity(mugId, change) {
      dispatch(updateQuantityThunk(mugId, change))
    },
    removeMugFromCart(mugId) {
      dispatch(removeFromCartThunk(mugId))
    },
    checkoutMugs() {
      dispatch(checkoutCartThunk())
    }
  }
}

export default connect(mapState, mapDispatch)(Cart)

Cart.propTypes = {
  cart: PropTypes.object.isRequired,
  loadCart: PropTypes.func.isRequired,
  updateQuantity: PropTypes.func.isRequired,
  removeMugFromCart: PropTypes.func.isRequired,
  checkoutMugs: PropTypes.func.isRequired
}
