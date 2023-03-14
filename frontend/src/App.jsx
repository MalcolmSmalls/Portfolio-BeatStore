import { useState } from 'react'
import { Footer, Header, MainPlayer } from './components'
import HomeScreen from './screens/HomeScreen'

function App() {
  return (
    <div className='App'>
      <Header />
      <MainPlayer />

      <main className='min-h-[82vh]'>
        <div className=' flex font-Staatliches justify-center flex-col items-center text-9xl mt-[20px] mb-[30px]'>
          <HomeScreen />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
