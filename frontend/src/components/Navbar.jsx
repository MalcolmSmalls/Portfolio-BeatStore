import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'

export default function Navbar() {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <nav>
      <div className='h-10 bg-white'>
        <ul className='flex  gap-10 uppercase absolute  justify-center w-full h-20 top-3 z-20 text-golden pl-10 font-PressStart text-xs'>
          <li>
            <Link to='/' className='hover:text-main-dark'>
              Home
            </Link>
          </li>
          <li>
            <Link to='/#beats' className='hover:text-main-dark'>
              Beats
            </Link>
          </li>
          <li>
            <Link to='#' className='hover:text-main-dark'>
              Soundkits
            </Link>
          </li>
          <li>
            <Link to='#' className='hover:text-main-dark'>
              Contact
            </Link>
          </li>
          <li>
            {userInfo ? (
              <Link to='/profile' className='hover:text-main-dark'>
                My Profile
              </Link>
            ) : (
              <Link to='/login' className='hover:text-main-dark'>
                Log-In
              </Link>
            )}
          </li>

          {userInfo ? (
            <li>
              <span
                to='/profile'
                className='hover:text-main-dark cursor-pointer'
                onClick={logoutHandler}
              >
                Log-Out
              </span>
            </li>
          ) : null}

          <li>
            <Link to='/cart' className='hover:text-main-dark'>
              Cart
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
