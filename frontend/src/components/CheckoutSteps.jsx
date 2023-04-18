import React from 'react'
import { Link } from 'react-router-dom'

export default function CheckoutSteps({ step1, step2, step3 }) {
  return (
    <nav className='flex gap-3 justify-center font-Poppins text-sm uppercase items-center'>
      <div className='flex items-center h-10'>
        {step1 ? (
          <Link to='/login' className='font-bold text-main-dark'>
            <span className='flex items-center'>
              <i className='fa-solid fa-circle pr-[5px] text-[7px]'></i>Log In
            </span>
          </Link>
        ) : (
          <span disabled className='flex items-center text-lighter-dark'>
            <i className='fa-regular fa-circle pr-[5px] text-[7px]'></i>Log In
          </span>
        )}
      </div>

      <div className='flex items-center h-10'>
        {step2 ? (
          <Link to='/payment' className='font-bold text-main-dark'>
            <span className='flex items-center'>
              <i className='fa-solid fa-circle pr-[5px] text-[7px]'></i>Payment
            </span>
          </Link>
        ) : (
          <span disabled className='flex items-center text-lighter-dark'>
            <i className='fa-regular fa-circle pr-[5px] text-[7px]'></i>Payment
          </span>
        )}
      </div>

      <div className='flex items-center h-10'>
        {step3 ? (
          <Link to='/placeorder' className='font-bold text-main-dark'>
            <span className='flex items-center'>
              <i className='fa-solid fa-circle pr-[5px] text-[7px] text-lighter-dark'></i>
              Place Order
            </span>
          </Link>
        ) : (
          <span disabled className='flex items-center'>
            <i className='fa-regular fa-circle pr-[5px] text-[7px]'></i>Place
            Order
          </span>
        )}
      </div>
    </nav>
  )
}
