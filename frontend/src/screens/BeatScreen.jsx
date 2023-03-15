import React from 'react'
import beats from '../beats'
import { Link, useParams } from 'react-router-dom'

export default function BeatScreen() {
  const { id } = useParams()
  const beat = beats.find((b) => b._id === id)
  return (
    <>
      {/* <div className='flex flex-col items-center'>{beat.name}</div> */}
      <section className='text-center'>
        <h2 className='uppercase tracking-wide text-5xl font-bold font-PressStart text-golden mt-10'>
          {beat.name}
        </h2>
        <p className='uppercase text-light-gray text-lg font-Poppins'>
          Produced by Malcolm Smalls
        </p>
      </section>
      <div className='flex justify-center font-Poppins text-sm w-full  mt-16 gap-20'>
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
            <span className='block pb-2'>{beat.BPM}</span>
            <span className='font-bold'>Key</span>
            <span className='block pb-2'>{beat.Key}</span>
            <span className='font-bold'>Tags</span>
            <span className='block pb-2'>{`${beat.Tags[0]}, ${beat.Tags[1]}, ${beat.Tags[2]}`}</span>
            <span className='font-bold'>Type Beat</span>
            <span className='block pb-2'>{`${beat.TypeBeat[0]}, ${beat.TypeBeat[1]}, ${beat.TypeBeat[2]}`}</span>
            <span className='font-bold'>Rating</span>
            <span className='block pb-2'>
              {beat.rating} out of {beat.numReviews} reviews.
            </span>
            <span className='font-bold'>Price</span>
            <span className='block pb-2'>${beat.price}</span>
          </section>
        </div>
      </div>

      <span className='uppercase text-lg'>Back</span>
      <Link className='flex flex-col items-center font-Poppins' to='/'>
        <i className='fa-sharp fa-solid fa-backward-step text-2xl'></i>
      </Link>
    </>
  )
}
