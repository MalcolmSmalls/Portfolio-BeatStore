import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listUsers, deleteUser } from '../actions/userActions'

export default function UserListScreen() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      navigate('/login')
    }
  }, [dispatch, userLogin, successDelete])

  const deleteHandler = (id) => {
    dispatch(deleteUser(id))
    console.log(id)
  }
  return (
    <>
      <h1 className='pb-10 pt-10'>Users</h1>
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
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className='fas fa-check text-green-500'></i>
                  ) : (
                    <i className='fas fa-times text-red-500'></i>
                  )}
                </td>
                <td>
                  <Link to={`/user/${user._id}/edit`}>
                    <button>
                      <i className='fas fa-edit pr-10'></i>
                    </button>
                  </Link>
                  <button onClick={() => deleteHandler(user._id)}>
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
