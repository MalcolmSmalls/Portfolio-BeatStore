import React, { useEffect, useState, useRef } from 'react'
import Wavesurfer from 'wavesurfer.js'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Waveform({ url, beatId, prevBeat, nextBeat }) {
  const waveform = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hoverElement, setHoverElement] = useState(null)
  const [beatID, setBeatID] = useState(Number(beatId))
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!waveform.current) {
      waveform.current = Wavesurfer.create({
        container: '#waveform',
        scrollParent: false,
        progressColor: 'rgba(243,200,72,255)',
        height: 150,
        barRadius: 3,
        barWidth: 1,
        barGap: 2,
        cursorWidth: 2,
      })
    }
    waveform.current.load(url)
    setIsPlaying(false)
  }, [url, location])

  const playAudio = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying)
    if (waveform.current.isPlaying()) {
      waveform.current.pause()
    } else {
      waveform.current.play()
    }
  }

  const changeHoverTextDisplay = (element) => {
    if (element === hoverElement && element !== null) {
      return 'block text-center'
    } else {
      return 'invisible'
    }
  }

  //   navigate(`/beat/${Number(beatId) - 1}`)
  // }

  // const nextBeat = () => {
  //   navigate(`/beat/${beatId}`)
  // }
  return (
    <div className='w-full flex flex-col items-center justify-center mt-10 text-sm'>
      <div id='waveform' className='lg:w-1/2 w-[90%]'></div>
      <div className='flex justify-center items-center  gap-2 mt-4'>
        <div className='flex flex-col items-center justify-center '>
          <button
            id='goBack'
            onClick={() => navigate(`/beat/${prevBeat()}`)}
            onMouseEnter={(e) => setHoverElement(e.target.id)}
            onMouseLeave={() => setHoverElement(null)}
            className='border-golden border-4 rounded-full h-10 w-10 text-golden hover:border-lighter-dark hover:text-lighter-dark'
          >
            <i class='fa-solid fa-backward-step'></i>
          </button>
          <span className={changeHoverTextDisplay('goBack')}>
            Prev
            <span className='block'>Track</span>
          </span>
        </div>
        <div className='flex flex-col items-center'>
          <button
            id='backToLocation'
            onClick={playAudio}
            className='border-golden border-4 rounded-full h-14 w-14 text-golden hover:border-lighter-dark hover:text-lighter-dark'
            onMouseEnter={(e) => setHoverElement(e.target.id)}
            onMouseLeave={() => setHoverElement(null)}
          >
            <i class='fa-solid fa-backward'></i>
          </button>
          <span className={changeHoverTextDisplay('backToLocation')}>
            To
            <span className='block'>Intro</span>
          </span>
        </div>
        <div className='flex flex-col items-center'>
          <button
            id='play'
            onClick={playAudio}
            className='border-golden border-4 rounded-full h-16 w-16 text-golden hover:border-lighter-dark hover:text-lighter-dark'
            onMouseEnter={(e) => setHoverElement(e.target.id)}
            onMouseLeave={() => setHoverElement(null)}
          >
            {isPlaying ? (
              <i class='fa-solid fa-pause'></i>
            ) : (
              <i class='fa-solid fa-play'></i>
            )}
          </button>
          <span name='play' className={changeHoverTextDisplay('play')}>
            Playing
            <span className='block'>Intro</span>
          </span>
        </div>
        <div className='flex flex-col items-center'>
          <button
            onClick={playAudio}
            id='forwardToSection'
            className='border-golden border-4 rounded-full h-14 w-14 text-golden hover:border-lighter-dark hover:text-lighter-dark'
            onMouseEnter={(e) => setHoverElement(e.target.id)}
            onMouseLeave={() => setHoverElement(null)}
          >
            <i class='fa-solid fa-forward'></i>
          </button>
          <span className={changeHoverTextDisplay('forwardToSection')}>
            To
            <span className='block'>Chorus</span>
          </span>
        </div>

        <div className='flex flex-col items-center'>
          <button
            onClick={() => navigate(`/beat/${nextBeat()}`)}
            id='toNextTrack'
            className='border-golden border-4 rounded-full h-10 w-10 text-golden hover:border-lighter-dark hover:text-lighter-dark'
            onMouseEnter={(e) => setHoverElement(e.target.id)}
            onMouseLeave={() => setHoverElement(null)}
          >
            <i class='fa-solid fa-forward-step'></i>
          </button>
          <span className={changeHoverTextDisplay('toNextTrack')}>
            Next
            <span className='block'>Track</span>
          </span>
        </div>
      </div>
    </div>
  )
}
