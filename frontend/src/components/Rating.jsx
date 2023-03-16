import React from 'react'

export default function Rating({ text, value }) {
  return (
    <div className='text-golden'>
      <span>
        <i
          className={
            value >= 1
              ? 'fa-solid fa-star'
              : value >= 0.5
              ? 'fa-solid fa-star-half-stroke'
              : 'fa-regular fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            value >= 2
              ? 'fa-solid fa-star'
              : value >= 1.5
              ? 'fa-solid fa-star-half-stroke'
              : 'fa-regular fa-star'
          }
        ></i>

        <span>
          <i
            className={
              value >= 3
                ? 'fa-solid fa-star'
                : value >= 2.5
                ? 'fa-solid fa-star-half-stroke'
                : 'fa-regular fa-star'
            }
          ></i>
        </span>

        <span>
          <i
            className={
              value >= 4
                ? 'fa-solid fa-star'
                : value >= 3.5
                ? 'fa-solid fa-star-half-stroke'
                : 'fa-regular fa-star'
            }
          ></i>
        </span>

        <span>
          <i
            className={
              value >= 5
                ? 'fa-solid fa-star'
                : value >= 4.5
                ? 'fa-solid fa-star-half-stroke'
                : 'fa-regular fa-star'
            }
          ></i>
        </span>
      </span>
      <span className='text-lighter-dark text-sm'>({value})</span>
      <span className='text-lighter-dark block text-sm'>{text}</span>
    </div>
  )
}
