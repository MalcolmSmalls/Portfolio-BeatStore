import React, { useEffect, useState, useRef } from 'react'
import Wavesurfer from 'wavesurfer.js'

export default function Waveform({ url }) {
  const waveform = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hoverElement, setHoverElement] = useState(null)
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
      waveform.current.load(url)
    }
  }, [])

  const playAudio = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying)
    if (waveform.current.isPlaying()) {
      waveform.current.pause()
    } else {
      waveform.current.play()
    }
  }

  const changeHoverTextDisplay = (element) => {
    console.log(element)
    if (element === hoverElement && element !== null) {
      return 'block text-center'
    } else {
      return 'invisible'
    }
  }

  return (
    <div className='w-screen flex flex-col items-center justify-center mt-10 text-sm'>
      <div id='waveform' className='w-1/2'></div>
      <div className='flex justify-center items-center  gap-2'>
        <div className='flex flex-col items-center justify-center'>
          <button
            id='goBack'
            onClick={playAudio}
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
            onClick={playAudio}
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
