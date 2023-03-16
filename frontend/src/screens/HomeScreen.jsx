import axios from 'axios'
import React, { useState, useEffect } from 'react'

import { Beat } from '../components'

export default function HomeScreen() {
  const [beats, setBeats] = useState([])

  useEffect(() => {
    const fetchBeats = async () => {
      const { data } = await axios.get('api/beats')

      setBeats(data) // promise
    }

    fetchBeats()
  }, [])

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
