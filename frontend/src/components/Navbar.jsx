import React from 'react'

export default function Navbar() {
  return (
    <nav>
      <ul className='flex gap-7 uppercase absolute justify-end w-full h-full top-5 z-20 text-white font-bold pr-10 '>
        <li>
          <a href='#' className='hover:text-[#5b5b6a]'>
            Home
          </a>
        </li>
        <li>
          <a href='#' className='hover:text-[#5b5b6a]'>
            Beats
          </a>
        </li>
        <li>
          <a href='#' className='hover:text-[#5b5b6a]'>
            Soundkits
          </a>
        </li>
        <li>
          <a href='#' className='hover:text-[#5b5b6a]'>
            Contact
          </a>
        </li>
      </ul>
    </nav>
  )
}
