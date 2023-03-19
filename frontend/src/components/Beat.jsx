import React from 'react'
import { Link } from 'react-router-dom'

export default function Beat({ beat }) {
  return (
    <div className='flex items-center justify-end gap-5 '>
      <li className='mb-[-30px]'>
        <Link to={`/beat/${beat._id}`}>{beat.name}</Link>
        <span className='text-golden'>.</span>
      </li>
      <div className='flex items-center justify-center border-8 rounded-full h-20 w-20 mt-5'>
        <i className='fa-solid fa-play text-xl'></i>
      </div>
      <div className='flex flex-col text-xs font-Poppins items-center justify-center mt-11  w-50 uppercase  '>
        <ul>
          <li>
            <span className='font-bold'>BPM:</span> {beat.bpm}
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
          <div className='w-[50vw] bg-white h-4 mt-[1px] pr-50'></div>
        </ul>
      </div>
    </div>
  )
}
