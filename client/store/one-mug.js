import axios from 'axios'
// import import history from '../history';

const initialState = {}

// Action Types
const GET_ONE_MUG = 'GET_ONE_MUG'

// Actions
const gotOneMug = oneMug => ({type: GET_ONE_MUG, oneMug})

// Thunks
export const fetchOneMugThunk = id => {
  return async dispatch => {
    try {
      if (!id) dispatch(gotOneMug({}))
      else {
        const {data} = await axios.get(`/api/mugs/${id}`)
        dispatch(gotOneMug(data))
      }
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
