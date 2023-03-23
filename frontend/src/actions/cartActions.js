import axios from 'axios'
import { CART_ADD_ITEM } from '../constants/cartConstants'

export const addToCart = (id) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/beats/${id}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      beat: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
    },
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
