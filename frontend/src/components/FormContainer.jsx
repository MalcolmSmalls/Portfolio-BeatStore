import React from 'react'

export default function FormContainer({ children }) {
  return (
    <div className='container flex  flex-col items-center justify-center text-lg '>
      {children}
    </div>
  )
}
