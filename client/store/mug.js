import axios from 'axios'
// import import history from '../history';

const initialState = []

// Action Types
const GET_ALL_MUGS = 'GET_ALL_MUGS'
const GET_ONE_MUG = 'GET_SINGLE_MUG'

// Actions
const getAllMugs = mugs => ({type: GET_ALL_MUGS, mugs})
const getOneMug = oneMug => ({type: GET_ONE_MUG, oneMug})

// Thunks
export const allMugsThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/mugs')
      dispatch(getAllMugs(data))
    } catch (error) {
      console.log('Ops! we have a trouble finding Mugs', error)
    }
  }
}

export const oneMugThunk = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/mugs${id}`)
      dispatch(getOneMug(data))
    } catch (error) {
      console.log('Ops! we have a trouble finding that Mug', error)
    }
  }
}

// REDUCER
const mugsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_MUGS:
      return [...action.mugs]
    case GET_ONE_MUG:
      return action.oneMug
    default:
      return state
  }
}

export default mugsReducer
