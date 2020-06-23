import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {addMugToCart} from '../store/cart'
import {Button} from 'react-bootstrap'

const SingleMug = ({addMugToCart, location}) => {
  const mug = location.state

  return (
    <div>
      {!mug ? (
        <div />
      ) : (
        <div className="single-mug-page">
          <div className="single-mug">
            <div className="left">
              <h2>{mug.title}</h2>
              <img src={mug.imgUrl} height="400" width="400" />
            </div>
            <div className="right">
              <h4>Color: {mug.color}</h4>
              <h4>Capacity: {mug.capacity}oz</h4>
              <h4>Price: ${mug.price / 100}</h4>
              <p>Details: {mug.description}</p>
            </div>
          </div>
          <div>
            <Button
              variant="outline-success"
              className="addCartButton"
              onClick={() => addMugToCart(mug.id)}
            >
              Add To Cart
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

const mapDispatch = dispatch => {
  return {
    addMugToCart(mugId) {
      dispatch(addMugToCart(mugId))
    }
  }
}

export default connect(null, mapDispatch)(SingleMug)

SingleMug.propTypes = {
  addMugToCart: PropTypes.func.isRequired
}
