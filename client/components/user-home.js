import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Cart} from '.'

/**
 * COMPONENT
 */
export const UserHome = ({user}) => {
  console.log('THIS IS MY USER:', user)
  return (
    <div>
      <h3>Welcome, {user.email}</h3>
      <img src={user.imgUrl} />
      {/* <Cart /> */}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  user: PropTypes.object.isRequired
}
