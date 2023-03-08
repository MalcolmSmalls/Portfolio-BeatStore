import React, { useState, useEffect } from 'react'

export default function Header({
  children: slides,
  autoSlide = false,
  autoSlideInterval = 10000,
}) {
  const [curr, setCurr] = useState(0)
  const goToIndex = (e) => {
    setCurr(Number(e.target.id))
  }
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1))

  useEffect(() => {
    if (!autoSlide) return
    const slideInterval = setInterval(next, autoSlideInterval)
    return () => clearInterval(slideInterval)
  }, [])
  return (
    <header>
      <main className='relative overflow-hidden'>
        <div
          className='flex transition-transform ease-out duration-500'
          style={{ transform: `translateX(-${curr * 100}%)` }}
        >
          {slides}
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
