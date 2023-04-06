import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Waveform } from '../components'
import { Rating } from '../components'
import { listBeatDetails, createBeatReview } from '../actions/beatActions'
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
  }, [dispatch, id, successBeatReview])

  const addToCartHandler = () => {
    navigate(`/cart/${id}`)
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
          <div className='text-sm '>
            <h2 className='text-9xl mb-5 text-center'>Reviews</h2>
            <div className='w-screen flex'>
              <div className='w-[50%] font-Poppins text-left pl-[10%] p-5'>
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
                    <div className='flex flex-col gap-2'>
                      <textarea
                        onChange={(e) => setComment(e.target.value)}
                        className='border-2 w-[60%] h-[100px] rounded'
                      />
                      <button
                        type='submit'
                        className='border-2 p-1 w-20 rounded bg-golden hover:bg-[#F3B311]'
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
