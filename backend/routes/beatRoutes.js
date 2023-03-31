import express from 'express'
import {
  getBeats,
  getBeatById,
  deleteBeat,
} from '../controllers/beatController.js'

import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(getBeats)

router.route('/:id').get(getBeatById).delete(protect, admin, deleteBeat)

export default router
