import { useState } from 'react'
import { Footer, Header } from './components'
import { pic1, pic2 } from './assets'

function App() {
  const slides = [pic1, pic2]
  return (
    <div className='App'>
      <div>
        <Header>
          {slides.map((s) => (
            <div
              className='flex-none h-screen w-screen'
              style={{
                backgroundImage: `url(${s})`,
                width: '100%',
                height: '84vh',
                backgroundSize: 'cover',
                backgroundPosition: '0% 25%',
              }}
            ></div>
          ))}
          {/* {slides.map((s) => (
            <img src={s} />
          ))} */}
        </Header>
      </div>

      <main className='min-h-[82vh]'>
        <div className='container flex justify-center'>
          <h1>Malcolm Smalls Beats</h1>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
