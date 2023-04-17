import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import { FormContainer } from '../components'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, userInfo, redirect])
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }
  return (
    <FormContainer>
      <h1 className='text-9xl mt-10 mb-5 text-golden'>Log-In</h1>
      {error && <h2 className='text-red-500'>{error}</h2>}
      {loading && <h2>Loading...</h2>}
      <form
        onSubmit={submitHandler}
        className='flex items-center flex-col w-[30%] font-Poppins'
      >
        <label htmlFor='email' className='text-sm uppercase font-bold'>
          E-Mail Address
        </label>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Enter your email'
          id='email'
          className='border-2 rounded p-1 lg:w-[80%] w-[13rem] mb-5'
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
          className='border-2 rounded p-1 lg:w-[80%] w-[13rem]'
        />
        <button
          type='submit'
          className='uppercase block  bg-lighter-dark  text-white p-3 rounded-lg text-sm font-bold tracking-widest hover:bg-main-dark w-[80%] mt-5 mb-10 '
        >
          Sign In
        </button>
      </form>
      <p>
        New Customer?{' '}
        <Link
          className='text-golden'
          to={redirect ? `/register?redirect=${redirect}` : '/register'}
        >
          Register
        </Link>
      </p>
    </FormContainer>
  )
}
