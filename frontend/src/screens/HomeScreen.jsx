import React from 'react'
import beats from '../beats'

export default function HomeScreen() {
  return (
    <>
      <ul className='container flex flex-col'>
        {beats.map((beat) => (
          <div className='flex items-center justify-end gap-5 '>
            <li className='mb-[-30px]'>
              {beat.name}
              <span className='text-golden'>.</span>
            </li>
            <div className='flex items-center justify-center border-8 rounded-full h-20 w-20 mt-5'>
              <i className='fa-solid fa-play text-xl'></i>
            </div>
            <div className='flex flex-col text-xs font-Poppins items-center justify-center mt-11  w-50 uppercase  '>
              <ul>
                <li>
                  <span className='font-bold'>BPM:</span> {beat.BPM}
                </li>
                <li>
                  <span className='font-bold'>Key:</span> {beat.Key}
                </li>
                <li>
                  <span className='font-bold'>Tags:</span> {beat.Tags[0]} -{' '}
                  {beat.Tags[1]} - {beat.Tags[2]}
                </li>
                <li>
                  <span className='font-bold'>Type:</span> {beat.TypeBeat[0]} -{' '}
                  {beat.TypeBeat[1]} - {beat.TypeBeat[2]}
                </li>
                <div className='w-[50vw] bg-white h-4 mt-[1px] pr-50'></div>
              </ul>
            </div>
          </div>
        ))}
      </ul>
    </>
  )
}
