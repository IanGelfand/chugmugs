import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Cart, Login} from '.'

/**
 * COMPONENT
 */
export const UserHome = ({user}) => {
  return (
    <div>
      {!user.id ? (
        <div>
          <h3>Login or Signup to continue</h3>
          <Login />
        </div>
      ) : (
        <div>
          <h3>Welcome, {user.email}</h3>
          <img src={user.imgUrl} />
          <Cart />
        </div>
      )}
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
