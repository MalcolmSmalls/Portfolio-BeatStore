import React from 'react'

export default function Footer() {
  return (
    <footer>
      <div className='flex lg:flex-row bg-main-dark text-white font-Poppins lg:justify-between p-10 px-60 lg:w-full flex-col items-center gap-2'>
        <div className='uppercase text-center w-52 lg:w-80'>
          Copyright &copy; 2022 Malcolm Smalls
        </div>
        <div className='flex gap-5'>
          <a
            href='http://instagram.com/bruhbigchop'
            className='hover:text-darken-white'
          >
            <i class='fab fa-instagram'></i>
          </a>
          <a
            href='http://twitter.com/malcolmsmallsdev'
            className='hover:text-darken-white'
          >
            <i class='fa-brands fa-twitter'></i>
          </a>
          <a
            href='http://youtube.com/bruhbigchop'
            className='hover:text-darken-white'
          >
            <i class='fa-brands fa-youtube'></i>
          </a>
        </div>
      </div>
    </footer>
  )
}
