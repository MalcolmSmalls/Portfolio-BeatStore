import React, { useState, useEffect } from 'react'

export default function Hero({
  children: slides,
  autoSlide = false,
  autoSlideInterval = 10000,
  slideArr,
}) {
  const [curr, setCurr] = useState(0)
  const [subTextVisibility, setSubTextVisibility] = useState(false)
  const goToIndex = (e) => {
    setCurr(Number(e.target.id))
  }
  const next = () => {
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1))
    setSubTextVisibility(false)
  }

  useEffect(() => {
    if (!autoSlide) return
    console.log(subTextVisibility)
    const slideInterval = setInterval(next, autoSlideInterval)
    return () => clearInterval(slideInterval)
  }, [])
  return (
    <header>
      <main className='relative overflow-hidden'>
        <div
          className='flex transition-transform ease-out duration-500'
          style={{ transform: `translateX(-${curr * 100}%)` }}
          onTransitionEnd={() => console.log('woah')}
        >
          {slides}
        </div>
        <div className='absolute flex flex-col justify-center items-center w-full h-full top-1'>
          <h1
            key={slideArr[curr].title}
            className=' text-white uppercase text-[60px] font-PressStart animate-fade-in-up'
            onAnimationEnd={() => setSubTextVisibility(true)}
          >
            {slideArr[curr].title}
          </h1>
          <h2
            key={slideArr[curr].subText}
            className={
              subTextVisibility
                ? 'animate-fade-in-down text-white uppercase text-[30px] tracking-widest '
                : 'invisible text-white uppercase text-[30px] tracking-widest '
            }
          >
            {slideArr[curr].subText}
          </h2>
        </div>

        <div className='absolute bottom-4 right-0 left-0 flex items-center justify-center gap-2'>
          {slides.map((item, i) => (
            <div
              key={i}
              id={i}
              onClick={(e) => goToIndex(e)}
              className={`
            transition-all w-2 h-2 bg-white rounded-full
            ${curr === i ? 'p-1' : 'bg-opacity-50'}
            `}
            />
          ))}
        </div>
      </main>
    </header>
  )
}
