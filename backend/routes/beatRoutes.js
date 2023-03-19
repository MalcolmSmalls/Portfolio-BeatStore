import express from 'express'
import Beat from '../models/beatModel.js'
import asyncHandler from 'express-async-handler'
const router = express.Router()

// @desc Fetch all beats
// @route GET /api/beats
// @access all users
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const beats = await Beat.find({})
    res.json(beats)
  })
)

// @desc Fetch single beat
// @route GET /api/beats/:id
// @access all users
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const beat = await Beat.findById(req.params.id)

    if (beat) {
      res.json(beat)
    } else {
      res.status(404).json({ message: 'Beat not found' })
    }
  })
)

export default router
