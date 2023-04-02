import express from 'express'
import {
  getBeats,
  getBeatById,
  deleteBeat,
  updateBeat,
  addBeat,
  createBeatReview,
} from '../controllers/beatController.js'

import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(getBeats).post(protect, admin, addBeat)

router.route('/:id/reviews').post(protect, createBeatReview)

router
  .route('/:id')
  .get(getBeatById)
  .delete(protect, admin, deleteBeat)
  .put(protect, admin, updateBeat)

export default router
