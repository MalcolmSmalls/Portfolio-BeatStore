import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getOrderDetails, payOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET } from '../constants/orderConstants'

export default function OrderScreen() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [sdkReady, setSdkReady] = useState(false)
  const orderId = id
  const dispatch = useDispatch()
  const orderDetails = useSelector((state) => state.orderDetails)

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const { order, loading, error } = orderDetails

  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }

      document.body.appendChild(script)
    }

    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [order, dispatch, orderId, successPay])

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(orderId, paymentResult))
  }

  return loading ? (
    <h2>Loading</h2>
  ) : error ? (
    <h2>{error}</h2>
  ) : (
    <>
      <div className='text-sm w-screen flex flex-col items-center'>
        <h1 className='text-golden text-2xl font-PressStart mt-10'>
          Order {orderId}
        </h1>
        <div className='border-2 w-9/12 p-5 flex'>
          <div className='w-1/2'>
            <h2 className='text-golden text-2xl'>Information</h2>
            <div className='font-Poppins pb-5'>
              <p>Name: {order.user.name}</p>
              Email:{' '}
              <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
            </div>
            <h2 className='text-golden text-2xl'>Payment Method</h2>

            <p className='font-Poppins'>{order.paymentMethod}</p>
            {order.isPaid ? (
              <p>Paid on {order.paidAt}</p>
            ) : (
              <p className='text-red-500'>Not Paid</p>
            )}
            <h2 className='text-golden text-2xl pt-5'>Order Items</h2>
            {order.orderItems.length === 0 ? (
              <span>Order is empty</span>
            ) : (
              <div className='border-2 font-Poppins'>
                <ul>
                  {order.orderItems.map((item, index) => (
                    <div className='flex p-3 items-center gap-3'>
                      <img
                        src={item.image}
                        alt={item.name}
                        className='object-cover rounded w-10 h-10'
                      />
                      <div>
                        <li className='text-base'>
                          <Link to={`/beat/${item.beat}`}>{item.name}</Link>
                        </li>

                        <p className='text-gray-400 text-xs'>
                          Crafted by Malcolm Smalls
                        </p>
                      </div>
                      <div>
                        <div className='pl-60'>
                          <span>${item.price}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className='border-2 w-1/2 flex flex-col p-5'>
            <h2 className='text-golden text-2xl'>Order Summary</h2>
            <div className='flex flex-col items-center pt-6'>
              <div className='flex items-center gap-20'>
                <p className='text-xs '>Total Price </p>

                <p className='text-2xl'>${order.totalPrice}</p>
              </div>

              {error && (
                <p className='text-red-500 pt-5  text-center'>{error}</p>
              )}
              {!order.isPaid && (
                <div>
                  {loadingPay && <h2>Loading</h2>}
                  {!sdkReady ? (
                    <h2>Loading</h2>
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
