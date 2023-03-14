import React from 'react'

export default function Navbar() {
  return (
    <nav>
      <ul className='flex gap-10 uppercase absolute justify-start w-full h-20 top-5 z-20 text-white pl-10 font-PressStart'>
        <li>
          <a href='#' className='hover:text-golden'>
            Home
          </a>
        </li>
        <li>
          <a href='#' className='hover:text-golden'>
            Beats
          </a>
        </li>
        <li>
          <a href='#' className='hover:text-golden'>
            Soundkits
          </a>
        </li>
        <li>
          <a href='#' className='hover:text-golden'>
            Contact
          </a>
        </li>
        <li>
          <a href='#' className='hover:text-golden'>
            Log-In
          </a>
        </li>
      </ul>
    </nav>
  )
}
