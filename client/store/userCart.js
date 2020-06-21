import axios from 'axios'

// const cartItem = {
//   cartItemId: "123",
//   qty: 3,
//   subtotal: 30.00,

//   product: {
//     name: "MUG 1",
//     color: "Blue",
//     material: "Metal",
//     price: 10.00
//   }
// }

// cart: {
//   cartId,
//   total,
//   items: [

//   ]
// }

/// Receive allCart every time!!!

const initialState = []

// ACTIONS
const GET_ALL_ITEMS = 'GET_ALL_ITEMS'
const ADD_ITEM = 'ADD_ITEM'
const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY'
const REMOVE_ITEM = 'REMOVE_ITEM'

const getAllItems = allItems => ({type: GET_ALL_ITEMS, allItems})

const addItem = item => ({
  type: ADD_ITEM,
  item
})
const removeItem = itemId => ({
  type: REMOVE_ITEM,
  itemId
})
const updateItemQuantity = updatedItem => ({
  type: UPDATE_ITEM_QUANTITY,
  updatedItem
})

// THUNKS
export const getCartItemsThunk = () => async dispatch => {
  try {
    const res = await axios.get('./api/cart')
    dispatch(getAllItems(res.data))
  } catch (error) {
    console.log("Thunk error, can't get All Cart Items", error)
  }
}

export const addToCartThunk = id => async dispatch => {
  try {
    console.log('mug id sent to thunk', id)
    const res = await axios.put(`./api/cart/add/${id}`)
    console.log('added mug sent back to thunk', res)
    dispatch(addItem(res.data))
  } catch (error) {
    console.log("Thunk error, can't get All Cart Items", error)
  }
}

export const removeFromCartThunk = itemId => async dispatch => {
  try {
    await axios.delete(`./api/cart${itemId}`)
    dispatch(removeItem(itemId))
  } catch (error) {
    console.log("Thunk error, can't Remove item from cart", error)
  }
}

export const updateQuantityThunk = updatedItem => async dispatch => {
  try {
    const res = await axios.patch(`./api/cart${updatedItem.id}`, updatedItem)
    dispatch(updateItemQuantity(res.data))
  } catch (error) {
    console.log("Thunk error, can't Update item in the cart", error)
  }
}

// REDUCER CART
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ITEMS:
      return [...action.allItems]
    case ADD_ITEM:
      return [...state, action.item]
    case REMOVE_ITEM:
      return state.filter(item => item.id !== action.id)
    case UPDATE_ITEM_QUANTITY:
      return state.map(item => {
        if (item.id === action.updatedItem.id) return action.updatedItem
        else return item
      })
    default:
      return state
  }
}

export default cartReducer
