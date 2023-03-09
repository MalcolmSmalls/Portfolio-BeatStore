import { useState } from 'react'
import { Hero } from './'
import { pic1, pic2 } from '../assets'

function Header() {
  const slides = [
    { picture: pic1, title: '', subText: '', btn: '' },
    { picture: pic2, title: '', subText: '', btn: '' },
  ]
  return (
    <div className='App'>
      <div>
        <Hero autoSlide={true}>
          {slides.map((s) => (
            <div
              className='flex-none h-screen w-screen'
              style={{
                backgroundImage: `url(${s.picture})`,
                width: '100%',
                height: '84vh',
                backgroundSize: 'cover',
                backgroundPosition: '60% 20%',
              }}
            ></div>
          ))}
          {/* {slides.map((s) => (
            <img src={s} />
          ))} */}
        </Hero>
      </div>
    </div>
  )
}

export default Header
