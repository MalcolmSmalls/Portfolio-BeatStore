import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'

import { addToCart } from '../actions/cartActions'

export default function CartScreen() {
  const navigate = useNavigate()
  const { id } = useParams()

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  console.log(cartItems)

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id))
    }
  }, [dispatch, id])
  return <div>CartScreen</div>
}
