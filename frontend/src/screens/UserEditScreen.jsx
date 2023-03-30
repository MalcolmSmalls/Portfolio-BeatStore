import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

import { FormContainer } from '../components'

export default function UserEditScreen() {
  const { id } = useParams()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      navigate('/admin/userlist')
    } else {
      if (!user.name || user._id !== id) {
        dispatch(getUserDetails(id))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [user, dispatch, id, successUpdate])
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({ _id: id, name, email, isAdmin }))
  }
  return (
    <>
      <Link to='/admin/userlist'>Go Back</Link>
      <FormContainer>
        <h1 className='text-9xl mt-10 text-golden'>Edit User</h1>
        {loadingUpdate && <h2>Loading...</h2>}
        {errorUpdate && <h2>{errorUpdate}</h2>}
        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h2 className='text-red-500'>{error}</h2>
        ) : (
          <form
            onSubmit={submitHandler}
            className='flex items-center flex-col w-[30%] font-Poppins'
          >
            <label htmlFor='name' className='text-sm uppercase font-bold'>
              Name
            </label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Enter your name'
              id='name'
              className='border-2 rounded p-1 w-[80%] mb-5'
            />
            <label htmlFor='email' className='text-sm uppercase font-bold'>
              E-Mail Address
            </label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email'
              id='email'
              className='border-2 rounded p-1 w-[80%] mb-5'
            />
            <label htmlFor='isAdmin' className='text-sm uppercase font-bold'>
              Is Admin
            </label>
            <input
              type='checkbox'
              onChange={(e) => setIsAdmin(e.target.checked)}
              id='isAdmin'
              checked={isAdmin}
              className='border-2 rounded p-1 w-[80%]'
            />

            <button
              type='submit'
              className='uppercase block  bg-lighter-dark  text-white p-3 rounded-lg text-sm font-bold tracking-widest hover:bg-main-dark w-[80%] mt-5 mb-10 '
            >
              Update
            </button>
          </form>
        )}
      </FormContainer>
    </>
  )
}
