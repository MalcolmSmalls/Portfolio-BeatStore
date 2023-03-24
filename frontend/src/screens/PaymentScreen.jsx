import React, { useState } from 'react'
import { useDispatch, useSelector, useNavigate } from 'react-redux'
import { CheckoutSteps } from '../components'
import { savePaymentMethod } from '../actions/cartActions'
export default function PaymentScreen() {
  const [paymentMethod, setPaymentMethod] = useState('PayPal')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHanler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }
  return <div>PaymentScreen</div>
}
