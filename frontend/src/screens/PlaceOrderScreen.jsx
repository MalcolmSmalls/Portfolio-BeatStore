import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CheckoutSteps } from '../components'
import { Link } from 'react-router-dom'
import { createOrder } from '../actions/orderActions'

export default function PlaceOrderScreen() {
  const cart = useSelector((state) => state.cart)

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  const navigate = useNavigate()
  const orderCreate = useSelector((state) => state.orderCreate)

  const { order, success, error } = orderCreate

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`)
    }
  }, [navigate, success])

  cart.totalPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price, 0)
  )
  const dispatch = useDispatch()
  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        paymentMethod: cart.paymentMethod,
        totalPrice: cart.totalPrice,
      })
    )
  }
  return (
    <div className='text-sm w-screen flex flex-col items-center'>
      <CheckoutSteps step1 step2 step3 />
      <div className='border-2 w-9/12 p-5 flex'>
        <div className='w-1/2'>
          <h2 className='text-golden text-2xl'>Payment Method</h2>

          <p className='font-Poppins'>{cart.paymentMethod}</p>

          <h2 className='text-golden text-2xl pt-5'>Order Items</h2>
          {cart.cartItems.length === 0 ? (
            <span>Your cart is empty</span>
          ) : (
            <div className='border-2 font-Poppins'>
              <ul>
                {cart.cartItems.map((item, index) => (
                  <div className='flex p-3 items-center gap-3'>
                    <img
                      src={item.image}
                      alt={item.name}
                      className='object-cover rounded w-10 h-10'
                    />
                    <div>
                      <li className='text-base'>
                        <Link to={`/beat/${item.beat}`}>{item.name}</Link>
                      </li>

                      <p className='text-gray-400 text-xs'>
                        Crafted by Malcolm Smalls
                      </p>
                    </div>
                    <div>
                      <div className='ml-60'>
                        <span>${item.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className='border-2 w-1/2 flex flex-col p-5'>
          <h2 className='text-golden text-2xl'>Order Summary</h2>
          <div className='flex flex-col items-center pt-6'>
            <div className='flex items-center gap-20'>
              <p className='text-xs '>Total Price </p>

              <p className='text-2xl'>${cart.totalPrice}</p>
            </div>

            {error && <p className='text-red-500 pt-5  text-center'>{error}</p>}

            <button
              type='submit'
              disabled={cart.cartItems === 0}
              className='uppercase block  bg-lighter-dark  text-white p-3 rounded-lg text-sm font-bold tracking-widest hover:bg-main-dark w-[50%] mt-6 mb-10 font-Poppins'
              onClick={placeOrderHandler}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
