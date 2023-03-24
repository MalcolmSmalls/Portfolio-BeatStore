import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile } from '../actions/userActions'

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

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)

  const { success } = userUpdateProfile
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
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }
  }
  return (
    <div className='w-screen flex'>
      <div className='left w-[50%] text-lg flex flex-col items-center'>
        <h3 className='text-5xl p-10 text-golden'>My Profile</h3>
        {error && <h2 className='text-red-500'>{error}</h2>}
        {success && (
          <h2 className='text-green-500'>Profile Successfully Updated</h2>
        )}
        {message && <h2 className='text-red-500'>{message}</h2>}
        {loading && <h2>Loading...</h2>}
        <div className='flex items-center w-[70%]'>
          <form
            onSubmit={submitHandler}
            className='flex items-start flex-col w-[100%] font-Poppins'
          >
            <label
              htmlFor='name'
              className='text-sm uppercase font-bold flex justify-start'
            >
              Name
            </label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Enter your name'
              id='name'
              className='border-2 rounded p-1 w-full mb-5'
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
              className='border-2 rounded p-1 w-full mb-5'
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
              className='border-2 rounded p-1 w-full'
            />

            <label
              htmlFor='confirmPassword'
              className='text-sm uppercase font-bold mt-5'
            >
              Confirm Password
            </label>
            <input
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder='Confirm your password'
              id='confirmPassword'
              className='border-2 rounded p-1 w-full'
            />
            <button
              type='submit'
              className='uppercase block  bg-lighter-dark  text-white p-3 rounded-lg text-sm font-bold tracking-widest hover:bg-main-dark w-full mt-5 mb-10 '
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
      <div className='right border-2 w-[50%] text-lg'>
        <h3 className='text-5xl p-10 text-golden'>My Orders</h3>
      </div>
    </div>
  )
}
