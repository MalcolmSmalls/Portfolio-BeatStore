import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Waveform } from '../components'
import { Rating } from '../components'
import {
  listBeatDetails,
  createBeatReview,
  listBeats,
} from '../actions/beatActions'
import { BEAT_CREATE_REVIEW_RESET } from '../constants/beatConstants'
import Meta from '../components/Meta'

export default function BeatScreen() {
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch()
  // const beat = beats.find((b) => b._id === id)

  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const beatDetails = useSelector((state) => state.beatDetails)
  const { loading, error, beat } = beatDetails

  const beatList = useSelector((state) => state.beatList)

  const {
    loading: loadingBeat,
    error: errorBeat,
    beats,
    page,
    pages,
  } = beatList

  const beatCreateReview = useSelector((state) => state.beatCreateReview)
  const { error: errorBeatReview, success: successBeatReview } =
    beatCreateReview

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (successBeatReview) {
      alert('Review Submitted!')
      setRating(0)
      setComment('')
      dispatch({ type: BEAT_CREATE_REVIEW_RESET })
    }
    dispatch(listBeatDetails(id))
    dispatch(listBeats())
  }, [dispatch, id, successBeatReview])

  const addToCartHandler = () => {
    navigate(`/cart/${id}`)
  }

  const nextBeat = () => {
    let nextBeat
    beats.forEach((item, index) => {
      if (item._id === id) {
        if (index === beats.length - 1) {
          nextBeat = beats[0]._id
        } else {
          nextBeat = beats[index + 1]._id
        }
      }
    })

    return nextBeat
  }

  const prevBeat = () => {
    let prevBeat
    beats.forEach((item, index) => {
      if (item._id === id) {
        if (index === 0) {
          prevBeat = beats[beats.length - 1]._id
        } else {
          prevBeat = beats[index - 1]._id
        }
      }
    })

    return prevBeat
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createBeatReview(id, {
        rating,
        comment,
      })
    )
  }

  return (
    <>
      <Meta title={`${beat.name} (Produced By Malcolm Smalls)`} />
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

          <div className='flex lg:flex-row flex-col items-center lg:items-start lg:justify-center font-Poppins text-sm w-full  mt-10  lg:gap-20 gap-5'>
            <div className='flex lg:flex-col lg:w-1/3 w-full justify-center lg:items-end'>
              <img
                className='object-cover h-96 w-96'
                src={beat.image}
                alt={beat.name}
              />
            </div>
            <div className='flex flex-col w-fit text-center lg:text-left lg:w-1/3 text-lighter-dark text-xl'>
              <section>
                <span className='font-bold'>BPM</span>
                <span className='block lg:pb-2 pb-4'>{beat.bpm}</span>
                <span className='font-bold'>Key</span>
                <span className='block lg:pb-2 pb-4'>{beat.key}</span>
                <span className='font-bold'>Tags</span>
                <span className='block lg:pb-2 pb-4'>{`${beat.tags[0]}, ${beat.tags[1]}, ${beat.tags[2]}`}</span>
                <span className='font-bold'>Type Beat</span>
                <span className='block lg:pb-2 pb-4'>{`${beat.typeBeat[0]}, ${beat.typeBeat[1]}, ${beat.typeBeat[2]}`}</span>
                <span className='font-bold'>Rating</span>
                <span className='block lg:pb-2 pb-4'>
                  <Rating
                    value={beat.rating}
                    text={`out of ${beat.numReviews} review${
                      beat.numReviews === 1 ? '' : 's'
                    }`}
                  />
                </span>
                <span className='font-bold'>Price</span>
                <span className='block lg:pb-2 pb-4'>${beat.price}</span>
                <button
                  className='ml-auto mr-auto lg:ml-0 lg:mr-0 uppercase block  bg-lighter-dark  text-white p-3 rounded-lg text-sm font-bold tracking-widest hover:bg-main-dark '
                  onClick={addToCartHandler}
                >
                  Add to Cart
                </button>
              </section>
            </div>
          </div>
          <div className='w-full'>
            <Waveform
              url={beat.file}
              beatId={beat._id}
              prevBeat={prevBeat}
              nextBeat={nextBeat}
            />
          </div>
          <div className='text-sm '>
            <h2 className='lg:text-9xl text-8xl mb-5 text-center lg:mt-0 mt-5'>
              Reviews
            </h2>
            <div className='min-w-[98vw] flex lg:flex-row flex-col'>
              <div className='lg:w-[50%] w-[90%] font-Poppins text-left pl-[10%] p-5 '>
                {beat.reviews.length === 0 && <p>No Reviews</p>}
                <ul>
                  {beat.reviews.map((review) => (
                    <li key={review._id}>
                      <h4 className='font-bold'>{review.name}</h4>
                      <div className='flex gap-2 items-center '>
                        <span className='text-xs'>
                          <Rating value={review.rating} />
                        </span>
                        <p className='text-xs text-gray-500'>
                          {review.createdAt.substring(0, 10)}
                        </p>
                      </div>

                      <p className='mb-5'>{review.comment}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className='w-[50%] font-Poppins p-5'>
                <h2 className='font-bold'>Write a review</h2>
                {errorBeatReview && (
                  <p className='text-red-500 text-xs pb-1'>{errorBeatReview}</p>
                )}
                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <select
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      className='border-2 rounded'
                    >
                      <option value=''>Select...</option>
                      <option value='1'>1 - Poor</option>
                      <option value='2'>2 - Fair</option>
                      <option value='3'>3 - Good</option>
                      <option value='4'>4 - Very Good</option>
                      <option value='5'>5 - Excellent</option>
                    </select>

                    <h3 className='pt-2 text-xs'>Comment</h3>
                    <div className='flex flex-col gap-2 w-[90vw] lg:w-full'>
                      <textarea
                        onChange={(e) => setComment(e.target.value)}
                        className='border-2 lg:w-[60%] w-[90vw] h-[100px] rounded mb-4 lg-mb-0'
                      />
                      <button
                        type='submit'
                        className='border-2 p-1 w-20 rounded bg-golden hover:bg-[#F3B311] lg:ml-0 lg:mr-0 ml-auto mr-auto'
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                ) : (
                  <p>
                    Please <Link to='/login'>Log-In</Link> to write a review
                  </p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
