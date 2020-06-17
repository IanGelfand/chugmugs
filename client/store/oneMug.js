import axios from 'axios'
// import import history from '../history';

const initialState = {}

// Action Types
const GET_ONE_MUG = 'GET_SINGLE_MUG'

// Actions
const getOneMug = oneMug => ({type: GET_ONE_MUG, oneMug})

// Thunks
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
const oneMugReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ONE_MUG:
      return action.oneMug
    default:
      return state
  }
}

export default oneMugReducer
