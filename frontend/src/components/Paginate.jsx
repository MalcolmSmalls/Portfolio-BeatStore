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
        {[...Array(pages).keys()].map((x) => (
          <Link
            key={x + 1}
            active={x + 1 === page}
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
      </>
    )
  )
}
