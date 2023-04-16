import React, { useState, useRef, useEffect } from 'react'
import styles from '../styles/AudioPlayer.module.css'
import apple from '../assets/apple.mp3'

export default function MainPlayer({ playingFile, isPlaying, setIsPlaying }) {
  // const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  // animation ref
  const audioPlayer = useRef()
  const progressBar = useRef() // reference to progessbar
  const animationRef = useRef() // reference animation to update playhead each second

  //   useEffect(() => {
  //     setDuration(audioPlayer.current.duration)
  //   }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState])

  useEffect(() => {
    if (isPlaying) {
      audioPlayer.current.play()
      animationRef.current = requestAnimationFrame(whilePlaying)
    } else {
      audioPlayer.current.pause()
      cancelAnimationFrame(animationRef.current)
    }
  }, [playingFile, isPlaying, currentTime, duration])

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

  const backThirty = () => {
    progressBar.current.value = Number(progressBar.current.value) - 30
    changeRange()
  }

  const forwardThirty = () => {
    progressBar.current.value = Number(progressBar.current.value) + 30
    changeRange()
  }

  return (
    <div className='lg:min-h-[5rem] min-h-24 bg-main-dark flex justify-center text-white lg:gap-5 gap-2 pl-2 lg:pl-0 items-center lg:w-full w-full'>
      <audio
        onLoadedMetadata={(e) => onLoadedMetadata(e)}
        ref={audioPlayer}
        src={playingFile}
      >
        {' '}
      </audio>
      <button>
        <i
          className='fa-solid fa-backward-fast lg:text-lg text-sm'
          onClick={backThirty}
        ></i>
      </button>

      <div className='lg:border-4 border-2 rounded-full lg:h-16 lg:w-16 w-12 h-12 flex justify-center items-center'>
        <button onClick={togglePlayPause}>
          {!isPlaying ? (
            <i className='fa-solid fa-play lg:text-lg text-sm'></i>
          ) : (
            <i className='fa-solid fa-pause lg:text-lg text-sm'></i>
          )}
        </button>
      </div>
      <button>
        <i
          className='fa-solid fa-forward-fast lg:text-lg text-sm'
          onClick={forwardThirty}
        ></i>
      </button>

      {/* current time */}
      <div>{calculateTime(currentTime)}</div>

      {/* progress bar */}
      <div>
        <input
          type='range'
          className={
            styles.progressBar +
            ' accent-white  bg-[#5b5b6a] rounded-lg h-2  appearance-none overflow-hidden lg:w-96 w-full'
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
