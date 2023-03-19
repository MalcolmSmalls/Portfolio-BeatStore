import React, { useEffect, useState, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Waveform } from '../components'
import { Rating } from '../components'
import axios from 'axios'

export default function BeatScreen() {
  const [beat, setBeat] = useState()
  const { id } = useParams()
  // const beat = beats.find((b) => b._id === id)

  useEffect(() => {
    const fetchBeat = async () => {
      const { data } = await axios.get(`/api/beats/${id}`)
      console.log(data.name)
      setBeat(data)
    }

    fetchBeat()
  }, [])

  return (
    <>
      {!beat ? (
        <h1>Loading</h1>
      ) : (
        <>
          {/* <div className='flex flex-col items-center'>{beat.name}</div> */}
          <section className='text-center'>
            <h2 className='uppercase tracking-wide text-5xl font-bold font-PressStart text-golden mt-10'>
              {beat.name}
            </h2>
            <p className='uppercase text-light-gray text-lg font-Poppins flex flex-col items-center'>
              Produced by Malcolm Smalls
              {/* <button className='uppercase block w-60 bg-lighter-dark text-white p-3 rounded-lg text-xl font-bold tracking-widest hover:bg-main-dark '>
        Add to Cart
      </button> */}
            </p>
          </section>

          <div className='flex justify-center font-Poppins text-sm w-full  mt-10  gap-20'>
            <div className='flex flex-col w-1/3 items-end'>
              <img
                className='object-cover h-96 w-96'
                src={beat.image}
                alt={beat.name}
              />
            </div>
            <div className='flex flex-col w-1/3 text-lighter-dark text-xl'>
              <section>
                <span className='font-bold'>BPM</span>
                <span className='block pb-2'>{beat.bpm}</span>
                <span className='font-bold'>Key</span>
                <span className='block pb-2'>{beat.key}</span>
                <span className='font-bold'>Tags</span>
                <span className='block pb-2'>{`${beat.tags[0]}, ${beat.tags[1]}, ${beat.tags[2]}`}</span>
                <span className='font-bold'>Type Beat</span>
                <span className='block pb-2'>{`${beat.typeBeat[0]}, ${beat.typeBeat[1]}, ${beat.typeBeat[2]}`}</span>
                <span className='font-bold'>Rating</span>
                <span className='block pb-2'>
                  <Rating
                    value={beat.rating}
                    text={`out of ${beat.numReviews} reviews`}
                  />
                </span>
                <span className='font-bold'>Price</span>
                <span className='block pb-2'>${beat.price}</span>
                <button className='uppercase block  bg-lighter-dark  text-white p-3 rounded-lg text-sm font-bold tracking-widest hover:bg-main-dark '>
                  Add to Cart
                </button>
              </section>
            </div>
          </div>
          {/* 
  <span className='uppercase text-lg'>Back</span>
  <Link className='flex flex-col items-center font-Poppins' to='/'>
    <i className='fa-sharp fa-solid fa-backward-step text-2xl'></i>
  </Link> */}
          <div>
            <Waveform url={beat.file} beatId={beat._id} />
          </div>
        </>
      )}
    </>
  )
}
