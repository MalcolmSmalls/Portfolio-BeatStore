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
  // console.log(cartItems)
  const userLogin = useSelector((state) => state.userLogin)

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id))
    }
  }, [dispatch, id])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    if (userLogin) {
      navigate('/payment')
    } else {
      navigate('/login')
    }
  }
  return (
    <div>
      {cartItems.length === 0 ? (
        <div className='flex flex-col justify-center items-center w-screen min-h-[82vh] gap-5 font-Poppins '>
          <p className='lg:text-6xl text-4xl'>Your cart is empty</p>
          <button className='uppercase block  bg-lighter-dark  text-white p-3 rounded-lg text-2xl tracking-widest hover:bg-main-dark '>
            <Link to='/'>Go Back</Link>
          </button>
        </div>
      ) : (
        <div className='w-[90vw]  min-h-[82vh]'>
          <h1 className='uppercase tracking-wide text-5xl font-bold font-PressStart text-golden mt-10 text-center'>
            Your Cart
          </h1>
          <div className=' flex justify-center pt-10 text-xl font-Poppins'>
            <div className='left w-0  lg:w-[10%] lg:flex justify-center  items-center invisible lg:visible'>
              <ul className='mt-10 invisible lg:visible'>
                {cartItems.map((item) => (
                  <>
                    <li className='lg:h-20 invisible lg:visible display:flex items-center pt-2'>
                      <img
                        src={item.image}
                        alt={item.name}
                        className='object-cover rounded lg:w-16 h-16 invisible lg:visible'
                      />
                    </li>
                  </>
                ))}
              </ul>
            </div>
            <div className='mid lg:w-[25%] w-[30%] flex-none'>
              <h2 className='h-10 uppercase flex  justify-center text-sm items-center font-bold'>
                Item
              </h2>
              <ul>
                {cartItems.map((item) => (
                  <li className='h-20 flex items-center lg:text-sm text-xs font-normal lg:text-left text-center'>
                    <Link to={`/beat/${item.beat}`}>
                      {item.name} (Produced by Malcolm Smalls)
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className='right lg:w-[10%] w-[20%] flex-none'>
              <h2 className='h-10 uppercase flex justify-center text-sm items-center font-bold'>
                Price
              </h2>
              <ul>
                {cartItems.map((item) => (
                  <li className='h-20 flex items-center lg:text-xl text-base font-normal  justify-center '>
                    ${item.price}
                  </li>
                ))}
              </ul>
            </div>
            <div className='right lg:w-[10%] w-[20%] flex-none'>
              <h2 className='h-10 uppercase flex justify-center text-sm items-center font-bold'>
                Remove
              </h2>
              <ul>
                {cartItems.map((item) => (
                  <li className='h-20 flex items-center justify-center lg:text-2xl text-base font-bold'>
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
            <div className='right-col lg:w-[30%] w-[32%] flex-none'>
              <div className='border-2 h-10 uppercase flex justify-center text-xs lg:text-sm items-center font-bold'>
                <h2 className='text-center'>
                  Subtotal ({cartItems.length}) items
                </h2>
              </div>
              <div className='flex p-5 lg:flex-row flex-col items-center'>
                <p className='lg:w-[50%] font-bold text-golden invisible lg:visible'>
                  Total
                </p>
                <p className='lg:w-[50%] text-golden flex justify-end font-bold'>
                  $
                  {cartItems
                    .reduce((acc, item) => acc + item.price, 0)
                    .toFixed(2)}
                </p>
              </div>
              <div className='w-full flex justify-center'>
                <button
                  className='w-[90%]  uppercase  bg-lighter-dark  text-white p-3 rounded-lg text-sm font-bold tracking-widest hover:bg-main-dark'
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  <span className='invisible hidden lg:inline lg:visible'>
                    Proceed To{' '}
                  </span>
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
