import React from 'react'
import { Link } from 'react-router-dom'
import MainPlayer from './MainPlayer'

export default function Beat({ beat, handleClick, isPlaying, target }) {
  return (
    <div
      id='beats'
      className='flex items-center justify-end  w-full lg:text-[7rem] text-[1.66rem] gap-3 lg:gap-0 lg:mb-0 mb-[0px]'
    >
      <li className='w-[40%] flex-1 flex justify-end '>
        <Link to={`/beat/${beat._id}`}>{beat.name}</Link>
        <span className='text-golden'>.</span>
      </li>
      <div className='w-[15%] lg:w-[10%]  flex justify-center'>
        <div
          className={`${
            isPlaying && beat._id === target
              ? 'text-golden border-golden  '
              : 'hover:border-golden hover:text-golden'
          } flex items-center justify-center border-8 rounded-full lg:h-20 lg:w-20 w-12 h-12 flex-none cursor-pointer`}
          onClick={(e) => handleClick(e, beat)}
        >
          {isPlaying && beat._id === target ? (
            <i className='fa-solid fa-pause text-base lg:text-xl'></i>
          ) : (
            <i className='fa-solid fa-play text-base lg:text-xl'></i>
          )}
        </div>
      </div>
      <div className='flex flex-1 flex-col text-[.500rem] lg:text-xs  leading-3 font-Poppins items-start justify-center lg:w-[40%] uppercase  text-left h-20'>
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
