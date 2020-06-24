import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {addMugToCart} from '../store/cart'
import {Button} from 'react-bootstrap'

// eslint-disable-next-line no-shadow
const SingleMug = ({addMugToCart, location}) => {
  const mug = location.state

  return (
    <div>
      {!mug ? (
        <div />
      ) : (
        <div>
          <div className="single-mug-page">
            <div className="mugImg">
              <img src={mug.imgUrl} height="500" width="auto" />
            </div>
            <div className="mugDetails">
              <h1 className="mugTitle">{mug.title}</h1>
              <div className="lineBreak" />
              <h4 className="mugPrice">${mug.price / 100}</h4>
              <div>
                <Button
                  variant="outline-success"
                  className="addCartButton"
                  size="lg"
                  onClick={() => addMugToCart(mug.id)}
                >
                  Add To Cart
                </Button>
              </div>
              <div className="lineBreak" />
              <h5 className="mugColor">Color: {mug.color}</h5>
              <h5 className="mugCapacity">Capacity: {mug.capacity}oz</h5>
              <p className="mugDescription">{mug.description}</p>
            </div>
          </div>
          <div />
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
