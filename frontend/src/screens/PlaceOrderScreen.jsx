import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CheckoutSteps } from '../components'

export default function PlaceOrderScreen() {
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  return (
    <div className='text-sm'>
      <CheckoutSteps step1 step2 step3 />
      <h2>Payment Method</h2>
      <p>Method: {cart.paymentMethod} </p>

      <h2>Order Items</h2>
      {cart.cartItems.length === 0 ? (
        <span>Your cart is empty</span>
      ) : (
        <div>
          {cart.cartItems.map((item, index) => (
            <li>{item.name}</li>
          ))}
        </div>
      )}
    </div>
  )
}
