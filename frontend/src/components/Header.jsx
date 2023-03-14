import { useState } from 'react'
import { Hero, Navbar } from './'
import { pic1, pic2 } from '../assets'

function Header() {
  const slides = [
    {
      picture: pic1,
      title: 'Malcolm Smalls',
      subText: 'Music Producer / Songwriter',
      btn: '',
    },
    {
      picture: pic2,
      title: '',
      subText: 'The hottest Rap and R&B beats produced daily!',
      btn: '',
    },
  ]
  return (
    <div className='App'>
      <div>
        <Navbar />
        <Hero autoSlide={true} slideArr={slides}>
          {slides.map((s) => (
            <>
              <div
                className='flex-none h-screen w-screen'
                style={{
                  backgroundImage: `url(${s.picture})`,
                  width: '100%',
                  height: '84vh',
                  backgroundSize: 'cover',
                  backgroundPosition: '0% 40%',
                }}
              ></div>
            </>
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
