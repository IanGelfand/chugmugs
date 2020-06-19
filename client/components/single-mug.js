import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {oneMugThunk} from '../store/oneMug'
import {addToCartThunk} from '../store/userCart'

class SingleMug extends Component {
  componentDidMount() {
    this.props.loadMug(this.props.match.params.mugId)
  }

  componentWillUnmount() {
    this.props.loadMug(0)
  }

  render() {
    const {mug, addMugToCart} = this.props

    return (
      mug && (
        <React.Fragment>
          <div className="single-mug">
            <h2>{mug.title}</h2>
            <img src={mug.imgUrl} />
            <h4>Capacity: {mug.capacity}</h4>
            <h4>Material: {mug.material}</h4>
            <h4>Price: ${mug.price}</h4>
            <p>{mug.description}</p>
          </div>
          <div>
            <button type="button" onClick={() => addMugToCart(mug.id)}>
              Add To Cart
            </button>
          </div>
        </React.Fragment>
      )
    )
  }
}

const mapState = state => {
  return {
    mug: state.oneMug
  }
}

const mapDispatch = dispatch => {
  return {
    loadMug(id) {
      dispatch(oneMugThunk(id))
    },
    addMugToCart(mugId) {
      dispatch(addToCartThunk(mugId))
    }
  }
}

export default connect(mapState, mapDispatch)(SingleMug)

SingleMug.propTypes = {
  mug: PropTypes.object.isRequired,
  loadMug: PropTypes.func.isRequired,
  addMugToCart: PropTypes.func.isRequired
}
