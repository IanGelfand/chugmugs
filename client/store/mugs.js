import axios from 'axios'

const initialState = []

const SET_MUGS = 'SET_MUGS'

const setMugs = mugs => ({type: SET_MUGS, mugs})

// Thunks
export const getMugs = () => {
  return async dispatch => {
    try {
      const res = await axios.get('/api/mugs')
      dispatch(setMugs(res.data))
    } catch (error) {
      console.log('Ops! we have a trouble finding Mugs', error)
    }
  }
}

// REDUCER
const mugsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MUGS:
      return [...action.mugs]

    default:
      return state
  }
}

export default mugsReducer
