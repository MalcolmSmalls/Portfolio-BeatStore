import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listBeats, deleteBeat, addBeat } from '../actions/beatActions'
import { BEAT_ADD_RESET } from '../constants/beatConstants'

export default function BeatListScreen() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const beatList = useSelector((state) => state.beatList)
  const { loading, error, beats } = beatList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const beatDelete = useSelector((state) => state.beatDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = beatDelete

  const beatAdd = useSelector((state) => state.beatAdd)
  const {
    loading: loadingAdd,
    error: errorAdd,
    success: successAdd,
    beat: addedBeat,
  } = beatAdd

  useEffect(() => {
    dispatch({ type: BEAT_ADD_RESET })
    if (!userInfo.isAdmin) {
      navigate('/login')
    }

    if (successAdd) {
      navigate(`/admin/beat/${addedBeat._id}/edit`)
    } else {
      dispatch(listBeats())
    }
  }, [dispatch, userLogin, successDelete, successAdd, addedBeat, navigate])

  const addBeatHandler = () => {
    dispatch(addBeat())
  }

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteBeat(id))
    }
  }
  return (
    <>
      <h1 className='pb-10 pt-10'>Beats</h1>
      <button
        onClick={addBeatHandler}
        className='text-lg bg-black text-white rounded p-3 mb-10'
      >
        <i className='fas fa-plus text-sm'></i> Add Beat
      </button>
      {loadingDelete && <h2>Loading...</h2>}
      {errorDelete && <h2>{errorDelete}</h2>}
      {loadingAdd && <h2>Loading...</h2>}
      {errorAdd && <h2>{errorAdd}</h2>}
      {loading ? (
        <h2>Loading</h2>
      ) : error ? (
        <span>{error}</span>
      ) : (
        <table className='text-sm font-Poppins w-[70%] text-center'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>TAGS</th>
              <th>TYPEBEAT</th>
              <th>BPM</th>
              <th>KEY</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {beats.map((beat) => (
              <tr key={beat._id}>
                <td>{beat._id}</td>
                <td>{beat.name}</td>
                <td>${beat.price}</td>
                <td>{beat.tags}</td>
                <td>{beat.typeBeat}</td>
                <td>{beat.bpm}</td>
                <td>{beat.key}</td>
                <td>
                  <Link to={`/admin/beat/${beat._id}/edit`}>
                    <button>
                      <i className='fas fa-edit pr-10'></i>
                    </button>
                  </Link>
                  <button onClick={() => deleteHandler(beat._id)}>
                    <i className='fas fa-trash'></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}
