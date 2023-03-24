import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../actions/userActions'

export default function ProfileScreen() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, navigate, userInfo, user])
  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      // DISPATCH UPDATE PROFILE
    }
  }
  return (
    <>
      <h1 className='text-9xl mt-10 text-golden'>Update Profile</h1>
      {error && <h2 className='text-red-500'>{error}</h2>}
      {message && <h2 className='text-red-500'>{message}</h2>}
      {loading && <h2>Loading...</h2>}
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
        <label htmlFor='password' className='text-sm uppercase font-bold'>
          Password
        </label>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Enter your password'
          id='password'
          className='border-2 rounded p-1 w-[80%]'
        />

        <label
          htmlFor='confirmPassword'
          className='text-sm uppercase font-bold'
        >
          Confirm Password
        </label>
        <input
          type='password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder='Confirm your password'
          id='confirmPassword'
          className='border-2 rounded p-1 w-[80%]'
        />
        <button
          type='submit'
          className='uppercase block  bg-lighter-dark  text-white p-3 rounded-lg text-sm font-bold tracking-widest hover:bg-main-dark w-[80%] mt-5 mb-10 '
        >
          Update Profile
        </button>
      </form>
    </>
  )
}
