import React, { useState, useRef, useEffect } from 'react'
import lofibeat from '../assets/lofibeat.mp3'

export default function MainPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const audioPlayer = useRef()

  //   useEffect(() => {
  //     setDuration(audioPlayer.current.duration)
  //   }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState])

  function onLoadedMetadata() {
    const seconds = Math.floor(audioPlayer.current?.duration)
    setDuration(audioPlayer.current?.duration)
  }

  function calculateTime(secs) {
    const minutes = Math.floor(secs / 60)
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
    const seconds = Math.floor(secs % 60)
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
    return `${returnedMinutes} : ${returnedSeconds}`
  }

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
      <audio
        onLoadedMetadata={onLoadedMetadata}
        ref={audioPlayer}
        src={lofibeat}
      >
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
      <div>{calculateTime(duration)}</div>
    </div>
  )
}
