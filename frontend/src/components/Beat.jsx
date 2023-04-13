import React from 'react'
import { Link } from 'react-router-dom'

export default function Beat({ beat }) {
  return (
    <div className='flex items-center justify-end  w-full lg:text-[7rem]'>
      <li className='w-[40%] flex-1 flex justify-end'>
        <Link to={`/beat/${beat._id}`}>{beat.name}</Link>
        <span className='text-golden'>.</span>
      </li>
      <div className='w-[15%] lg:w-[10%]  flex justify-center'>
        <div className='flex items-center justify-center border-8 rounded-full lg:h-20 lg:w-20 w-16 h-16  '>
          <i className='fa-solid fa-play text-lg lg:text-xl'></i>
        </div>
      </div>
      <div className='flex flex-1 flex-col text-[.700rem] lg:text-xs font-Poppins items-start justify-center w-[40%]  uppercase  text-left'>
        <ul>
          <li>
            <span className='font-bold'>BPM:</span> <span>{beat.bpm}</span>
          </li>
          <li>
            <span className='font-bold'>Key:</span> {beat.key}
          </li>
          <li>
            <span className='font-bold'>Tags:</span> {beat.tags[0]} -{' '}
            {beat.tags[1]} - {beat.tags[2]}
          </li>
          <li>
            <span className='font-bold'>Type:</span> {beat.typeBeat[0]} -{' '}
            {beat.typeBeat[1]} - {beat.typeBeat[2]}
          </li>
          {/* <div className='w-[33vw] bg-white h-4 mt-[1px] pr-50 '></div> */}
        </ul>
      </div>
    </div>
  )
}
