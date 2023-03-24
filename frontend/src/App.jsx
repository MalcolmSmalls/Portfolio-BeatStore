import { useState } from 'react'
import { Footer, Header, MainPlayer } from './components'
import HomeScreen from './screens/HomeScreen'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BeatScreen from './screens/BeatScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <MainPlayer />

      <main className='min-h-[82vh]' id='beats'>
        <div className=' flex font-Staatliches justify-center flex-col items-center text-9xl mt-[20px] mb-[30px]'>
          <Routes>
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/' element={<HomeScreen />} />
            <Route path='/beat/:id' element={<BeatScreen />} />
            <Route path='/cart/:id?' element={<CartScreen />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
