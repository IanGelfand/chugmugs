import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Mug} from '.'
import {getMugs} from '../store'

class AllMugs extends Component {
  componentDidMount() {
    this.props.loadMugs()
  }

  render() {
    const {mugs} = this.props

    return mugs === undefined || !mugs.length ? (
      <h1>No Current Mug Listings</h1>
    ) : (
      <React.Fragment>
        <h3>What Mug Will You Chug?</h3>
        <div id="mug-list">
          {mugs.map(mug => <Mug key={mug.id} {...mug} />)}
        </div>
      </React.Fragment>
    )
  }
}

const mapState = state => {
  return {
    mugs: state.mugs
  }
}

const mapDispatch = dispatch => {
  return {
    loadMugs() {
      dispatch(getMugs())
    }
  }
}

export default connect(mapState, mapDispatch)(AllMugs)

AllMugs.propTypes = {
  mugs: PropTypes.array.isRequired,
  loadMugs: PropTypes.func.isRequired
}
