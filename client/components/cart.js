import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Mug} from '.'
import {updateMug, removeMug, checkout} from '../store'

class Cart extends Component {
  render() {
    const {cart, checkoutMugs, updateQuantity, removeMugFromCart} = this.props

    return (
      <React.Fragment>
        <h3>Your Shopping Cart</h3>
        <div id="cart-list">
          {cart.map(mug => (
            <React.Fragment>
              <Mug key={mug.id} {...mug} />
              <label htmlFor="quantity">Quantity:</label>
              {/* implement quantity update element here */}
              <div>
                <button onClick={() => removeMugFromCart(mug.id)}>
                  Remove Mug From Cart
                </button>
              </div>
            </React.Fragment>
          ))}
        </div>
        <div>
          <button onClick={checkoutMugs}>Checkout</button>
        </div>
      </React.Fragment>
    )
  }
}

const mapState = state => {
  return {
    cart: state.user.mugs
  }
}

const mapDispatch = dispatch => {
  return {
    updateQuantity(mugId) {
      dispatch(updateMug(mugId))
    },
    removeMugFromCart(mugId) {
      dispatch(removeMug(mugId))
    },
    checkoutMugs() {
      dispatch(checkout())
    }
  }
}

export default connect(mapState, mapDispatch)(Cart)

Cart.propTypes = {
  cart: PropTypes.array.isRequired,
  updateQuantity: PropTypes.func.isRequired,
  removeMugFromCart: PropTypes.func.isRequired,
  checkoutMugs: PropTypes.func.isRequired
}
