import axios from 'axios'

const initialState = {}

// ACTIONS
const SET_CART = 'SET_CART'
const ADD_MUG = 'ADD_MUG'
const UPDATE_MUG_QUANTITY = 'UPDATE_MUG_QUANTITY'
const REMOVE_MUG = 'REMOVE_MUG'
const RESET_CART = 'RESET_CART'

const setCart = cartMugs => ({type: SET_CART, cartMugs})

const addMug = mug => ({
  type: ADD_MUG,
  mug
})

const updateMugQuantity = (mugId, change) => ({
  type: UPDATE_MUG_QUANTITY,
  mugId,
  change
})

const removeMug = mugId => ({
  type: REMOVE_MUG,
  mugId
})

export const resetCart = () => ({
  type: RESET_CART
})

// THUNKS
export const getCart = () => async dispatch => {
  try {
    const res = await axios.get('/api/cart')
    dispatch(setCart(res.data))
  } catch (error) {
    console.log("Thunk error, can't get All Cart Items", error)
  }
}

export const addMugToCart = mugId => async dispatch => {
  try {
    const res = await axios.put('/api/cart/add', {mugId: mugId})
    dispatch(addMug(res.data))
  } catch (error) {
    console.log("Thunk error, can't get All Cart Items", error)
  }
}

export const changeMugQuantity = (mugId, change) => async dispatch => {
  try {
    await axios.put(`/api/cart/update/${mugId}`, change)
    dispatch(updateMugQuantity(mugId, change.change))
  } catch (error) {
    console.log("Thunk error, can't Update item in the cart", error)
  }
}

export const removeMugFromCart = mugId => async dispatch => {
  try {
    await axios.delete(`/api/cart/${mugId}`)
    dispatch(removeMug(mugId))
  } catch (error) {
    console.log("Thunk error, can't Remove item from cart", error)
  }
}

export const checkoutCart = () => async dispatch => {
  try {
    await axios.put('/api/cart/checkout')
    dispatch(resetCart())
  } catch (error) {
    console.log("Thunk error, can't checkout cart", error)
  }
}
// REDUCER CART
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      const cart = {}

      action.cartMugs.forEach(mug => {
        cart[mug.id] = {...mug}
      })

      return {...cart}

    case ADD_MUG:
      if (!state[action.mug.id]) {
        state[action.mug.id] = {...action.mug}
        state[action.mug.id].quantity = 1
      } else state[action.mug.id].quantity++

      return {...state}

    case UPDATE_MUG_QUANTITY:
      state[action.mugId].quantity += action.change

      return {...state}

    case REMOVE_MUG:
      state[action.mugId] = null

      return {...state}

    case RESET_CART:
      return initialState

    default:
      return state
  }
}

export default cartReducer
