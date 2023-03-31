import asyncHandler from 'express-async-handler'
import Beat from '../models/beatModel.js'

// @desc Fetch all beats
// @route GET /api/beats
// @access all users
const getBeats = asyncHandler(async (req, res) => {
  const beats = await Beat.find({})

  res.json(beats)
})

// @desc Fetch single beat
// @route GET /api/beats/:id
// @access all users
const getBeatById = asyncHandler(async (req, res) => {
  const beat = await Beat.findById(req.params.id)

  if (beat) {
    res.json(beat)
  } else {
    res.status(404)
    throw new Error('Beat not found')
  }
})

// @desc Delete a beat
// @route Delete /api/beats/:id
// @access Private/Admin
const deleteBeat = asyncHandler(async (req, res) => {
  const beat = await Beat.findById(req.params.id)

  if (beat) {
    await beat.deleteOne()
    res.json({ message: 'Beat removed' })
  } else {
    res.status(404)
    throw new Error('Beat not found')
  }
})

export { getBeats, getBeatById, deleteBeat }
