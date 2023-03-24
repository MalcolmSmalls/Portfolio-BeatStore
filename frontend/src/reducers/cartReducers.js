import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload

      const existItem = state.cartItems.find((x) => x.beat === item.beat)

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.beat === existItem.beat ? item : x
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.beat !== action.payload),
      }

    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      }

    default:
      return state
  }
}
