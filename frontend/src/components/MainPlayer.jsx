import React, { useState, useRef } from 'react'
import lofibeat from '../assets/lofibeat.mp3'

export default function MainPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)

  const audioPlayer = useRef()

  function togglePlayPause() {
    const prevValue = isPlaying
    setIsPlaying(!prevValue)
    console.log(isPlaying)
    if (!prevValue) {
      audioPlayer.current.play()
    } else {
      audioPlayer.current.pause()
    }
  }
  return (
    <div className='h-[16vh] bg-main-dark flex justify-center text-white gap-5 items-center'>
      <audio ref={audioPlayer} src={lofibeat}>
        {' '}
      </audio>
      <button>
        <i className='fa-solid fa-backward-fast text-lg'></i>
      </button>

      <div className=' border-4 rounded-full h-16 w-16 flex justify-center items-center'>
        <button onClick={togglePlayPause}>
          {!isPlaying ? (
            <i className='fa-solid fa-play text-lg'></i>
          ) : (
            <i className='fa-solid fa-pause text-lg'></i>
          )}
        </button>
      </div>
      <button>
        <i className='fa-solid fa-forward-fast text-lg'></i>
      </button>

      {/* current time */}
      <div>0:00</div>

      {/* progress bar */}
      <div>
        <input
          type='range'
          className='w-96 accent-white  bg-[#5b5b6a] rounded-lg h-2  appearance-none overflow-hidden shadow-black'
        />
      </div>

      {/* duration */}
      <div>2:49</div>
    </div>
  )
}
