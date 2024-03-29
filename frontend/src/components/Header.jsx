import { useState } from 'react'
import { Hero, Navbar } from './'
import { pic1, pic2 } from '../assets'
import { Fragment } from 'react'

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
          {slides.map((s, i) => (
            <Fragment key={i}>
              <div
                className='flex-none bg-center lg:bg-[0%_40%] min-h-screen w-screen bg-cover'
                style={{
                  backgroundImage: `url(${s.picture})`,
                  width: '100%',
                  minHeight: '38rem',
                  // backgroundSize: 'cover',
                  // backgroundPosition: '0% 40%',
                }}
              ></div>
            </Fragment>
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
