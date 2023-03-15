import React from 'react'
import beats from '../beats'
import Beat from '../components'

export default function HomeScreen() {
  return (
    <>
      <ul id='beats' className='container flex flex-col'>
        {beats.map((beat) => (
          <Beat beat={beat} />
        ))}
      </ul>
    </>
  )
}
