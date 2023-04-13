import React from 'react'
import { Link } from 'react-router-dom'

export default function Paginate({
  pages,
  page,
  isAdmin = false,
  keyword = '',
}) {
  return (
    pages > 1 && (
      <>
        <div className='text-2xl flex gap-5 justify-center mt-20 items-center'>
          {[...Array(pages).keys()].map((x) => (
            <Link
              key={x + 1}
              active={x + 1 === page}
              className={
                x + 1 === page
                  ? 'text-golden font-bold text-3xl'
                  : 'text-black font-light text-xl'
              }
              to={
                !isAdmin
                  ? keyword
                    ? `/search/${keyword}/page/${x + 1}`
                    : `/page/${x + 1}`
                  : `/admin/beatlist/${x + 1}`
              }
            >
              {x + 1}
            </Link>
          ))}
        </div>
      </>
    )
  )
}
