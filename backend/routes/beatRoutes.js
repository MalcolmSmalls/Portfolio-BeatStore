import express from 'express'
import { getBeats, getBeatById } from '../controllers/beatController.js'

const router = express.Router()

router.route('/').get(getBeats)

router.route('/:id').get(getBeatById)

export default router
