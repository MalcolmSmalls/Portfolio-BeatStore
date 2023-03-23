import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav>
      <div className='h-10 bg-white'>
        <ul className='flex  gap-10 uppercase absolute  justify-center w-full h-20 top-3 z-20 text-golden pl-10 font-PressStart text-xs'>
          <li>
            <Link to='/' className='hover:text-main-dark'>
              Home
            </Link>
          </li>
          <li>
            <Link to='/#beats' className='hover:text-main-dark'>
              Beats
            </Link>
          </li>
          <li>
            <Link to='#' className='hover:text-main-dark'>
              Soundkits
            </Link>
          </li>
          <li>
            <Link to='#' className='hover:text-main-dark'>
              Contact
            </Link>
          </li>
          <li>
            <Link to='/login' className='hover:text-main-dark'>
              Log-In
            </Link>
          </li>
          <li>
            <Link to='/cart' className='hover:text-main-dark'>
              Cart
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
