import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listBeats } from '../actions/beatActions'
import { Beat } from '../components'
import { useParams } from 'react-router-dom'

export default function HomeScreen() {
  const dispatch = useDispatch()
  const { keyword } = useParams()

  const beatList = useSelector((state) => state.beatList)

  const { loading, error, beats } = beatList

  useEffect(() => {
    dispatch(listBeats(keyword))
  }, [dispatch, keyword])

  return (
    <>
      {loading ? (
        <h1>Loading</h1>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <ul id='beats' className='container flex flex-col'>
          {beats.map((beat) => (
            <Beat beat={beat} />
          ))}
        </ul>
      )}
    </>
  )
}
