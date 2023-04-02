import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listOrders } from '../actions/orderActions'

export default function OrderListScreen() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders())
    } else {
      navigate('/login')
    }
  }, [dispatch, userLogin])

  return (
    <>
      <h1 className='pb-10 pt-10'>Orders</h1>
      {loading ? (
        <h2>Loading</h2>
      ) : error ? (
        <span>{error}</span>
      ) : (
        <table className='text-sm font-Poppins w-[70%] text-center'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times text-red-500'></i>
                  )}
                </td>
                {/* <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className='fas fa-check text-green-500'></i>
                  ) : (
                    <i className='fas fa-times text-red-500'></i>
                  )}
                </td>*/}
                <td>
                  <Link to={`/order/${order._id}`}>
                    <button>Details</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}
