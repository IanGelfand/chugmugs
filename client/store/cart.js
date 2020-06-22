import axios from 'axios'

const initialState = {}

// ACTIONS
const GET_ALL_ITEMS = 'GET_ALL_ITEMS'
const ADD_ITEM = 'ADD_ITEM'
const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY'
const REMOVE_ITEM = 'REMOVE_ITEM'
const CHECKOUT_CART = 'CHECKOUT_CART'

const gotAllItems = allItems => ({type: GET_ALL_ITEMS, allItems})

const addedItemToCart = item => ({
  type: ADD_ITEM,
  item
})
const updatedItemQuantity = (itemId, change) => ({
  type: UPDATE_ITEM_QUANTITY,
  itemId,
  change
})
const removedItemFromCart = itemId => ({
  type: REMOVE_ITEM,
  itemId
})

const checkoutCart = () => ({
  type: CHECKOUT_CART
})

// THUNKS
export const fetchCartItemsThunk = () => async dispatch => {
  try {
    const res = await axios.get('/api/cart')
    dispatch(gotAllItems(res.data))
  } catch (error) {
    console.log("Thunk error, can't get All Cart Items", error)
  }
}

export const addToCartThunk = id => async dispatch => {
  try {
    const res = await axios.put('/api/cart/add', {mugId: id})
    dispatch(addedItemToCart(res.data))
  } catch (error) {
    console.log("Thunk error, can't get All Cart Items", error)
  }
}

export const updateQuantityThunk = (itemId, change) => async dispatch => {
  try {
    const res = await axios.put(`/api/cart/update/${itemId}`, change)
    dispatch(updatedItemQuantity(itemId, change.change))
  } catch (error) {
    console.log("Thunk error, can't Update item in the cart", error)
  }
}

export const removeFromCartThunk = itemId => async dispatch => {
  try {
    await axios.delete(`/api/cart/${itemId}`)
    dispatch(removedItemFromCart(itemId))
  } catch (error) {
    console.log("Thunk error, can't Remove item from cart", error)
  }
}

export const checkoutCartThunk = () => async dispatch => {
  try {
    await axios.put('/api/cart/checkout')
    dispatch(checkoutCart())
  } catch (error) {
    console.log("Thunk error, can't checkout cart", error)
  }
}
// REDUCER CART
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ITEMS:
      const cart = {}

      action.allItems.forEach(mug => {
        cart[mug.id] = {
          title: mug.title,
          price: mug.price,
          imgUrl: mug.imgUrl,
          quantity: mug.quantity
        }
      })

      return {...cart}

    case ADD_ITEM:
      if (!state[action.item.id]) {
        state[action.item.id] = {
          title: action.item.title,
          price: action.item.price,
          imgUrl: action.item.imgUrl,
          quantity: 1
        }

        return {...state}
      } else {
        state[action.item.id].quantity++

        return {...state}
      }

    case UPDATE_ITEM_QUANTITY:
      state[action.itemId].quantity += action.change

      return {...state}

    case REMOVE_ITEM:
      state[action.itemId] = undefined

      return {...state}

    case CHECKOUT_CART:
      return initialState

    default:
      return state
  }
}

export default cartReducer
