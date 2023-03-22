import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Waveform } from '../components'
import { Rating } from '../components'
import { listBeatDetails, listBeats } from '../actions/beatActions'

export default function BeatScreen() {
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch()
  // const beat = beats.find((b) => b._id === id)

  const beatDetails = useSelector((state) => state.beatDetails)
  const { loading, error, beat } = beatDetails

  useEffect(() => {
    dispatch(listBeatDetails(id))
  }, [dispatch, id])

  const addToCartHandler = () => {
    navigate(`/cart/${id}`)
  }

  return (
    <>
      {loading || loading === undefined ? (
        <h1>Loading</h1>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <>
          <section className='text-center'>
            <h2 className='uppercase tracking-wide text-5xl font-bold font-PressStart text-golden mt-10'>
              {beat.name}
            </h2>
            <p className='uppercase text-light-gray text-lg font-Poppins flex flex-col items-center'>
              Produced by Malcolm Smalls
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
                <button
                  className='uppercase block  bg-lighter-dark  text-white p-3 rounded-lg text-sm font-bold tracking-widest hover:bg-main-dark '
                  onClick={addToCartHandler}
                >
                  Add to Cart
                </button>
              </section>
            </div>
          </div>
          <div>
            <Waveform url={beat.file} beatId={beat._id} />
          </div>
        </>
      )}
    </>
  )
}
