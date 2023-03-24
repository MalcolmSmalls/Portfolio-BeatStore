import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'

import { addToCart, removeFromCart } from '../actions/cartActions'

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

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    navigate('/login?redirect=payment')
  }
  return (
    <div>
      {cartItems.length === 0 ? (
        <div className='flex flex-col justify-center items-center w-screen h-[82vh] gap-5 font-Poppins '>
          <p className='text-6xl'>Your cart is empty</p>
          <button className='uppercase block  bg-lighter-dark  text-white p-3 rounded-lg text-2xl tracking-widest hover:bg-main-dark '>
            <Link to='/'>Go Back</Link>
          </button>
        </div>
      ) : (
        <div className='border-8 w-[90vw] h-[82vh] flex pt-10 text-xl font-Poppins '>
          <div className='left border-2 w-[10%] flex justify-center '>
            <ul className='mt-10'>
              {cartItems.map((item) => (
                <>
                  <li className='border-2 h-20 flex items-center'>
                    <img
                      src={item.image}
                      alt={item.name}
                      className='object-cover rounded w-16 h-16'
                    />
                  </li>
                </>
              ))}
            </ul>
          </div>
          <div className='mid border-2 w-[30%]'>
            <h2 className='border-2 h-10 uppercase flex justify-center text-sm items-center'>
              Item
            </h2>
            <ul>
              {cartItems.map((item) => (
                <li className='border-2 h-20 flex items-center text-sm font-bold'>
                  <Link to={`/beat/${item.beat}`}>
                    {item.name} (Produced by Malcolm Smalls)
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='right border-2 w-[20%]'>
            <h2 className='border-2 h-10 uppercase flex justify-center text-sm items-center'>
              Price
            </h2>
            <ul>
              {cartItems.map((item) => (
                <li className='border-2 h-20 flex items-center text-2xl font-bold'>
                  ${item.price}
                </li>
              ))}
            </ul>
          </div>
          <div className='right border-2 w-[10%]'>
            <h2 className='border-2 h-10 uppercase flex justify-center text-sm items-center'>
              Remove
            </h2>
            <ul>
              {cartItems.map((item) => (
                <li className='border-2 h-20 flex items-center justify-center text-2xl font-bold'>
                  <button
                    type='button'
                    onClick={() => removeFromCartHandler(item.beat)}
                  >
                    {' '}
                    <i className='fa-solid fa-trash'></i>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className='right-col border-2 w-[30%]'>
            <div className='border-2 h-10 uppercase flex justify-center text-sm items-center'>
              <h2>Subtotal ({cartItems.length}) items</h2>
            </div>
            <div className='flex p-5'>
              <p className='w-[50%] font-bold text-golden'>Total</p>
              <p className='w-[50%] font-bold text-golden flex justify-end'>
                $
                {cartItems
                  .reduce((acc, item) => acc + item.price, 0)
                  .toFixed(2)}
              </p>
            </div>
            <div className='w-full flex justify-center'>
              <button
                className='w-[80%]  uppercase  bg-lighter-dark  text-white p-3 rounded-lg text-sm font-bold tracking-widest hover:bg-main-dark'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
