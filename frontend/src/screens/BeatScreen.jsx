import React from 'react'
import beats from '../beats'
import { Link, useParams } from 'react-router-dom'

export default function BeatScreen() {
  const { id } = useParams()
  const beat = beats.find((b) => b._id === id)
  return <div>{beat.name}</div>
}
