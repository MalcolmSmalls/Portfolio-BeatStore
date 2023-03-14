import React from 'react'

export default function Navbar() {
  return (
    <nav>
      <div className='h-10 bg-white'>
        <ul className='flex  gap-10 uppercase absolute  justify-center w-full h-20 top-3 z-20 text-golden pl-10 font-PressStart text-xs'>
          <li>
            <a href='#' className='hover:text-main-dark'>
              Home
            </a>
          </li>
          <li>
            <a href='#' className='hover:text-main-dark'>
              Beats
            </a>
          </li>
          <li>
            <a href='#' className='hover:text-main-dark'>
              Soundkits
            </a>
          </li>
          <li>
            <a href='#' className='hover:text-main-dark'>
              Contact
            </a>
          </li>
          <li>
            <a href='#' className='hover:text-main-dark'>
              Log-In
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
