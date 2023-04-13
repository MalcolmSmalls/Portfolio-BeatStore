import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'

export default function Navbar() {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const dispatch = useDispatch()

  const beats = useRef(null)

  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: 'smooth',
    })
  }

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <nav>
      <div className='h-10  bg-white'>
        <ul className='flex  items-center lg:items-start text-center lg:gap-10 gap-3 text-[.500rem] uppercase absolute justify-center w-full lg:h-20 top-3 z-20 text-golden lg:pl-10 font-PressStart lg:text-xs'>
          <li>
            <Link to='/' className='hover:text-main-dark'>
              Home
            </Link>
          </li>
          <li>
            <a href='#beats' className='hover:text-main-dark'>
              Beats
            </a>
          </li>

          {/* <li>
            <Link to='#' className='hover:text-main-dark'>
              Contact
            </Link>
          </li> */}
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
          {userInfo && userInfo.isAdmin && (
            <>
              <li>
                <Link to='/admin/userlist' className='hover:text-main-dark'>
                  Users
                </Link>
              </li>
              <li>
                <Link to='/admin/beatlist' className='hover:text-main-dark'>
                  Beats
                </Link>
              </li>
              <li>
                <Link to='/admin/orderlist' className='hover:text-main-dark'>
                  Orders
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}
