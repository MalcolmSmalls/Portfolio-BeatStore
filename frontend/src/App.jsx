import { useState } from 'react'
import { Footer, Header } from './components'

function App() {
  return (
    <div className='App'>
      <Header />
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
