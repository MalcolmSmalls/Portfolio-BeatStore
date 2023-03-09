import { useState } from 'react'
import { Footer, Header, MainPlayer } from './components'

function App() {
  return (
    <div className='App'>
      <Header />
      <MainPlayer />

      <main className='min-h-[82vh]'>
        <div className='container flex justify-center'>
          <h1 className='font-Rubik'>Malcolm Smalls Beats</h1>
        </div>
        <audio controls>
          <source
            src='http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3'
            type='audio/mp3'
          ></source>
        </audio>
      </main>
      <Footer />
    </div>
  )
}

export default App
