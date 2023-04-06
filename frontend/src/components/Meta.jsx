import React from 'react'
import { Helmet } from 'react-helmet'

export default function Meta({ title, description, keywords }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Prod. By Malcolm Smalls: Official Beat Store',
  description: 'Dope beats by upcoming music producer Malcolm Smalls.',
  keywords:
    'beats, music production, music producers, instrumentals, trap, rap',
}
