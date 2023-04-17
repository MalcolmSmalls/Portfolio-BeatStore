import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CheckoutSteps } from '../components'
import { savePaymentMethod } from '../actions/cartActions'
import { FormContainer } from '../components'
export default function PaymentScreen() {
  const [paymentMethod, setPaymentMethod] = useState('PayPal')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLogin = useSelector((state) => state.userLogin)

  const { userInfo } = userLogin

  console.log(userInfo)

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
  })

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1 className='text-8xl mt-10 mb-10 text-golden'>Payment</h1>

      <form
        onSubmit={submitHandler}
        className='flex items-start flex-col lg:w-[30%] w-[50%] font-Poppins'
      >
        <h2 className='mb-2 text-sm font-bold'>Select Payment Method:</h2>
        <div className='flex gap-1'>
          <input
            type='radio'
            id='paymentMethod'
            name='paymentMethod'
            value='PayPal'
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor='paymentMethod'>Paypal or Credit Card</label>
        </div>
        <button
          type='submit'
          className='uppercase block  bg-lighter-dark  text-white p-3 rounded-lg text-sm font-bold tracking-widest hover:bg-main-dark w-[80%] mt-5 mb-10 '
        >
          Continue
        </button>
      </form>
    </FormContainer>
  )
}
