import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Mug} from '.'
import {
  getCartItemsThunk
  // updateQuantityThunk,
  // removeFromCartThunk,
  // checkout
} from '../store/userCart'

class Cart extends Component {
  componentDidMount() {
    this.props.loadCart()
  }

  render() {
    const {cart, checkoutMugs, updateQuantity, removeMugFromCart} = this.props

    return (
      <React.Fragment>
        <h3>Your Shopping Cart</h3>
        <div id="cart-list">
          {cart.map(mug => (
            // <React.Fragment >
            <Mug key={mug.id} {...mug} />
            //    <label htmlFor="quantity">Quantity:</label>
            //    implement quantity update element here
            //   <div>
            //     <button type="button" onClick={() => removeMugFromCart(mug.id)}>
            //       Remove Mug From Cart
            //     </button>
            //   </div>
            // </React.Fragment>
          ))}
        </div>
        {/* <div>
          <button type="button" onClick={checkoutMugs}>
            Checkout
          </button>
        </div> */}
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
    }
    // updateQuantity(mugId) {
    //   dispatch(updateQuantityThunk(mugId))
    // },
    // removeMugFromCart(mugId) {
    //   dispatch(removeFromCartThunk(mugId))
    // },
    // checkoutMugs() {
    //   dispatch(checkout())
    // }
  }
}

export default connect(mapState, mapDispatch)(Cart)

Cart.propTypes = {
  cart: PropTypes.array.isRequired,
  loadCart: PropTypes.func.isRequired
  // updateQuantity: PropTypes.func.isRequired,
  // removeMugFromCart: PropTypes.func.isRequired,
  // checkoutMugs: PropTypes.func.isRequired
}
