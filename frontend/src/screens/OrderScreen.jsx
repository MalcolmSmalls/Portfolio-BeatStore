import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { getOrderDetails, payOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET } from '../constants/orderConstants'
import { listBeats } from '../actions/beatActions'
import fileDownload from 'js-file-download'

export default function OrderScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()
  const [sdkReady, setSdkReady] = useState(false)
  const orderId = id
  const dispatch = useDispatch()
  const orderDetails = useSelector((state) => state.orderDetails)

  const beatList = useSelector((state) => state.beatList)
  const { beats, loading: loadingBeats, error: errorBeats } = beatList

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
      dispatch(listBeats())
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [order, dispatch, orderId, successPay])

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult))
  }
  const downloadFile = (file, filename) => {
    const a = document.createElement('a')
    a.href = file
    a.setAttribute('download', filename)
    document.body.appendChild(a)
    a.click()
    a.remove()
  }
  return loading ? (
    <h2>Loading</h2>
  ) : error ? (
    <h2>{error}</h2>
  ) : (
    <>
      <div className='text-sm w-full flex flex-col items-center'>
        <h1 className='text-golden lg:text-2xl text-xl uppercase text-center font-PressStart mt-10'>
          Order{' '}
          <span className='lg:text-2xl text-sm block pb-5'>{orderId}</span>
        </h1>
        <div className='lg:w-9/12 p-5 flex lg:flex-row flex-col items-center justify-center '>
          <div className='lg:w-1/2 w-full'>
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
              <div className='font-Poppins'>
                <ul>
                  {order.orderItems.map((item, index) => (
                    <div className='flex p-3 items-center gap-3' key={index}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className='object-cover rounded w-10 h-10'
                      />
                      <div>
                        <li className='text-base' key={item.name}>
                          <Link to={`/beat/${item.beat}`}>{item.name}</Link>
                        </li>

                        <p className='text-gray-400 text-xs'>
                          Produced by Malcolm Smalls
                        </p>
                      </div>
                      <div>
                        <div className='lg:pl-52 pl-10'>
                          <span>${item.price}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className='flex flex-col lg:w-1/2 w-full lg:h-96'>
            <h2 className='text-golden text-2xl'>Order Summary</h2>
            <div className='w-full flex flex-col'>
              <div className='flex flex-col pt-6'>
                <div className='lg:flex items-center gap-20 mb-5 text-center'>
                  <p className='text-xs '>Total Price </p>

                  <p className='text-2xl block lg:inline'>
                    ${order.totalPrice}
                  </p>
                </div>

                {error && (
                  <p className='text-red-500 pt-5  text-center'>{error}</p>
                )}
                {!order.isPaid && (
                  <div className='w-full'>
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
              <div>
                {order.isPaid ? (
                  <h2 className='text-golden text-2xl pb-1'>Files</h2>
                ) : null}
                <ul className='font-Poppins flex flex-col gap-6 text-center uppercase'>
                  {order.isPaid
                    ? order.orderItems.map((item) => (
                        <li>
                          <span>{item.name} (Produced by Malcolm Smalls)</span>
                          <button
                            className='ml-auto mr-auto lg:ml-0 lg:mr-0 uppercase block  bg-lighter-dark  text-white p-3 rounded-lg text-sm font-bold tracking-widest hover:bg-main-dark w-full '
                            onClick={() => downloadFile(item.file, item.name)}
                          >
                            Download Here
                          </button>
                        </li>
                      ))
                    : null}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
