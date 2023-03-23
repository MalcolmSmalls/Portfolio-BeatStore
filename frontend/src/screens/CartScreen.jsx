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
  return (
    <div>
      {cartItems.length === 0 ? (
        <div className='flex flex-col justify-center items-center w-screen h-[82vh] gap-5 '>
          <p className='text-6xl'>Your cart is empty</p>
          <button className='uppercase block  bg-lighter-dark  text-white p-3 rounded-lg text-2xl tracking-widest hover:bg-main-dark '>
            <Link to='/'>Go Back</Link>
          </button>
        </div>
      ) : (
        <div className='border-8 w-[90vw] h-[82vh] flex pt-10 text-xl '>
          <div className='left border-2 w-[10%]'>
            <ul>
              {cartItems.map((item) => (
                <li>
                  <img
                    src={item.image}
                    className='mt-10 object-cover rounded w-20 h-20'
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className='mid border-2 w-[30%]'>
            <h2 className='border-2 h-10'>Item</h2>
            <ul>
              {cartItems.map((item) => (
                <li>{item.name}</li>
              ))}
            </ul>
          </div>
          <div className='right border-2 w-[30%]'>
            <h2>Price</h2>
            <ul>
              {cartItems.map((item) => (
                <li>{item.price}</li>
              ))}
            </ul>
          </div>
          <div className='right-col border-2 w-[30%]'></div>
        </div>
      )}
    </div>
  )
}
