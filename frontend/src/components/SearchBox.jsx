import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchBox() {
  const [keyword, setKeyword] = useState('')

  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/search/${keyword}`)
    } else {
      navigate('/')
    }
  }
  return (
    <>
      <form
        onSubmit={submitHandler}
        className='flex items-center justify-center'
      >
        <div class='relative'>
          <input
            type='search'
            onChange={(e) => setKeyword(e.target.value)}
            placeholder='Search Beats...'
            className='lg:w-[500px] w-fit p-4 text-sm rounded pr-24'
          />
          <button
            type='submit'
            className='text-white absolute right-2.5 bottom-2 bg-golden hover:bg-[#F3B311] focus:ring-4 focus:outline-none focus:ring-stone-300 font-medium rounded-lg text-sm px-4 py-2'
          >
            Search
          </button>
        </div>
        {/* <button
          type='submit'
          className='bg-black text-white h-10 p-5 flex items-center rounded'
        >
          Search
        </button> */}
      </form>
    </>
  )
}
