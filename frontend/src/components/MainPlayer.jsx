import React, { useState, useRef, useEffect } from 'react'
import styles from '../styles/AudioPlayer.module.css'
import lofibeat from '../assets/lofibeat.mp3'

export default function MainPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  // animation ref
  const audioPlayer = useRef()
  const progressBar = useRef() // reference to progessbar
  const animationRef = useRef() // reference animation to update playhead each second

  //   useEffect(() => {
  //     setDuration(audioPlayer.current.duration)
  //   }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState])

  function onLoadedMetadata() {
    const seconds = Math.floor(audioPlayer.current?.duration)
    setDuration(audioPlayer.current?.duration)
    progressBar.current.max = seconds
  }

  function changeRange() {
    audioPlayer.current.currentTime = progressBar.current.value
    changePlayerCurrentTime()

    //abstract this
    // progressBar.current.style.setProperty(
    //   '--seek-before-width',
    //   `${(progressBar.current.value / duration) * 100}%`
    // )
    // setCurrentTime(progressBar.current.value)
  }

  function calculateTime(secs) {
    const minutes = Math.floor(secs / 60)
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
    const seconds = Math.floor(secs % 60)
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
    return `${returnedMinutes}:${returnedSeconds}`
  }

  function togglePlayPause() {
    const prevValue = isPlaying
    setIsPlaying(!prevValue)
    console.log(isPlaying)
    if (!prevValue) {
      audioPlayer.current.play()
      animationRef.current = requestAnimationFrame(whilePlaying)
    } else {
      audioPlayer.current.pause()
      cancelAnimationFrame(animationRef.current)
    }
  }

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime
    changePlayerCurrentTime()
    animationRef.current = requestAnimationFrame(whilePlaying)
    // progressBar.current.style.setProperty(
    //   '--seek-before-width',
    //   `${(progressBar.current.value / duration) * 100}%`
    // )
    // setCurrentTime(progressBar.current.value)
  }

  // to refactor
  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty(
      '--seek-before-width',
      `${(progressBar.current.value / duration) * 100}%`
    )
    setCurrentTime(progressBar.current.value)
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
      <div>{calculateTime(currentTime)}</div>

      {/* progress bar */}
      <div>
        <input
          type='range'
          className={
            styles.progressBar +
            ' accent-white  bg-[#5b5b6a] rounded-lg h-2  appearance-none overflow-hidden w-96'
          }
          defaultValue='0'
          ref={progressBar}
          onChange={changeRange}
        />
      </div>

      {/* duration */}
      <div>{duration && !isNaN(duration) && calculateTime(duration)}</div>
    </div>
  )
}
