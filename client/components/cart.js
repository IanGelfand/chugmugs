import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Mug} from '.'
import {
  getCart,
  changeMugQuantity,
  removeMugFromCart,
  checkoutCart
} from '../store/cart'
import history from '../history'

class Cart extends Component {
  componentDidMount() {
    this.props.loadCart()
  }

  render() {
    const {cart, checkout, changeQuantity, removeMug} = this.props

    const mugs = []

    for (let mug in cart) {
      if (cart[mug]) mugs.push({...cart[mug]})
    }

    let totalMugs = mugs.reduce((sum, mug) => sum + mug.quantity, 0)

    let totalPrice =
      mugs.reduce((sum, mug) => sum + mug.price * mug.quantity, 0) / 100

    return (
      <div className="cart-main">
        <h3>Your Shopping Cart</h3>
        {!totalMugs ? (
          <h1 id="cart-main-h1">Your Cart Is Empty</h1>
        ) : (
          <div id="cart">
            <div className="cart-total">
              <div id="subtotal">
                Your Total: <div id="total-price">${totalPrice}</div>
              </div>
              <div>
                <button
                  className="checkout-btn"
                  type="button"
                  onClick={() => {
                    checkout()
                    history.push('/checkout')
                  }}
                >
                  Checkout
                </button>
              </div>
            </div>

            <div id="cart-mugs" className="mug-list">
              {mugs.map(mug => (
                <div key={mug.id} className="cart-mug">
                  <div>
                    <Mug mug={mug} />
                  </div>

                  <div>
                    <div className="quantity-card">
                      <div className="quantity">Quantity </div>
                      <div>
                        <button
                          type="button"
                          className="quantity-button"
                          onClick={() => changeQuantity(mug.id, {change: 1})}
                        >
                          +
                        </button>
                      </div>
                      <div className="quantity-number">{mug.quantity}</div>
                      <div>
                        <button
                          type="button"
                          className="quantity-button"
                          onClick={() => {
                            if (mug.quantity <= 1) removeMug(mug.id)
                            else changeQuantity(mug.id, {change: -1})
                          }}
                        >
                          -
                        </button>
                      </div>
                      <button
                        className="remove-btn"
                        type="button"
                        onClick={() => removeMug(mug.id)}
                      >
                        Remove Mug
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
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
      dispatch(getCart())
    },
    changeQuantity(mugId, change) {
      dispatch(changeMugQuantity(mugId, change))
    },
    removeMug(mugId) {
      dispatch(removeMugFromCart(mugId))
    },
    checkout() {
      dispatch(checkoutCart())
    }
  }
}

export default connect(mapState, mapDispatch)(Cart)

Cart.propTypes = {
  cart: PropTypes.object.isRequired,
  loadCart: PropTypes.func.isRequired,
  changeQuantity: PropTypes.func.isRequired,
  removeMug: PropTypes.func.isRequired,
  checkout: PropTypes.func.isRequired
}
