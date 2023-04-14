import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listBeats } from '../actions/beatActions'
import { Beat } from '../components'
import { useParams } from 'react-router-dom'
import Paginate from '../components/Paginate'

export default function HomeScreen({ handleClick }) {
  const dispatch = useDispatch()
  const { keyword } = useParams()
  const { pageNumber } = useParams() || 1

  const beatDetails = useSelector((state) => state.beatDetails)
  const {
    loading: loadingBeatDetails,
    error: errorBeatListDetails,
    beat,
  } = beatDetails

  const beatList = useSelector((state) => state.beatList)

  const { loading, error, beats, page, pages } = beatList

  useEffect(() => {
    dispatch(listBeats(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <div>
      {loading ? (
        <h1>Loading</h1>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <>
          <ul className='container flex flex-col lg:h-[108vh] h-fit w-[90vw]'>
            {beats.map((beat) => (
              <Beat beat={beat} handleClick={handleClick} />
            ))}
          </ul>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </div>
  )
}
