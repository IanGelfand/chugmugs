import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store/user'
import {Nav, Navbar, Container} from 'react-bootstrap'

const Navibar = ({handleClick, isLoggedIn}) => (
  <div>
    <Navbar id="nav-bar-color" expand="lg">
      <Navbar.Brand href="/">
        <img
          src="/imgs/mug-logo.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />
        ChugMugs
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto" />
        {isLoggedIn ? (
          <div>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
        <Nav.Link href="/mugs">Browse Mugs</Nav.Link>
        <Nav.Link href="/cart">Go to Cart</Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navibar)

/**
 * PROP TYPES
 */
Navibar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
