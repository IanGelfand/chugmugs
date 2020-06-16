import axios from 'axios'
// import import history from '../history';

const initialState = []

const GET_ALL_MUGS = 'GET_ALL_MUGS'
const getAllMugs = mugs => ({type: GET_ALL_MUGS, mugs})

// Thunks
export const getAllMugsThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/mugs')
      dispatch(getAllMugs(data))
    } catch (error) {
      console.log('Ops! we have a trouble finding Mugs', error)
    }
  }
}

// REDUCER
const allMugsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_MUGS:
      return [...action.mugs]
    default:
      return state
  }
}

export default allMugsReducer
