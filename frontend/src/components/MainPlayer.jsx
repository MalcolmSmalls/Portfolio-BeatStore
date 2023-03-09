import React from 'react'
import lofibeat from '../assets/lofibeat.mp3'

export default function MainPlayer() {
  return (
    <div className='h-[26vh] bg-main-dark flex justify-center text-white gap-5 items-center border'>
      <audio src={lofibeat}> </audio>
      <button>
        <i className='fa-solid fa-backward-fast text-lg'></i>
      </button>

      <div className=' border-4 rounded-full h-16 w-16 flex justify-center items-center'>
        <button>
          <i className='fa-solid fa-play text-lg'></i>
        </button>
      </div>
      <button>
        <i className='fa-solid fa-forward-fast text-lg'></i>
      </button>

      {/* current time */}
      <div>0:00</div>

      {/* progress bar */}
      <div>
        <input type='range' />
      </div>

      {/* duration */}
      <div>2:49</div>
    </div>
  )
}
