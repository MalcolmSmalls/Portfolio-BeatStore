import { useState } from 'react'
import { Footer, Header, MainPlayer } from './components'
import HomeScreen from './screens/HomeScreen'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BeatScreen from './screens/BeatScreen'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <MainPlayer />

      <main className='min-h-[82vh]'>
        <div className=' flex font-Staatliches justify-center flex-col items-center text-9xl mt-[20px] mb-[30px]'>
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/beat/:id' element={<BeatScreen />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
