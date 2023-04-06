import asyncHandler from 'express-async-handler'
import Beat from '../models/beatModel.js'

// @desc Fetch all beats
// @route GET /api/beats
// @access all users
const getBeats = asyncHandler(async (req, res) => {
  const pageSize = 4
  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword
    ? {
        $or: [
          { name: { $regex: req.query.keyword, $options: 'i' } },
          { tags: { $regex: req.query.keyword, $options: 'i' } },
          { typeBeat: { $regex: req.query.keyword, $options: 'i' } },
          { key: { $regex: req.query.keyword, $options: 'i' } },
        ],
      }
    : {}

  const count = await Beat.countDocuments({ ...keyword })
  const beats = await Beat.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ beats, page, pages: Math.ceil(count / pageSize) })
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

// @desc Create a beat
// @route POST /api/beats/
// @access Private/Admin
const addBeat = asyncHandler(async (req, res) => {
  const beat = new Beat({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    file: 'samplefile',
    image: 'samplepic',
    bpm: 120,
    key: 'Sample Key',
    description: '',
    tags: ['SampleTag1', 'SampleTag2', 'SampleTag3'],
    typeBeat: ['SampleType1', 'SampleType2', 'SampleType3'],
    numReviews: 0,
  })

  const createdBeat = await beat.save()
  res.status(201).json(createdBeat)
})

// @desc Update a beat
// @route PUT /api/beats/:id
// @access Private/Admin
const updateBeat = asyncHandler(async (req, res) => {
  const { name, price, tags, file, image, bpm, key, description, typeBeat } =
    req.body

  const beat = await Beat.findById(req.params.id)

  if (beat) {
    beat.name = name
    beat.price = price
    beat.tags = tags
    beat.file = file
    beat.image = image
    beat.bpm = bpm
    beat.key = key
    beat.description = description
    beat.typeBeat = typeBeat
    const updatedBeat = await beat.save()
    res.json(updatedBeat)
  } else {
    res.status(404)
    throw new Error('Beat not found')
  }
})

// @desc Create new review
// @route POST /api/beats/:id/reviews
// @access Private
const createBeatReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const beat = await Beat.findById(req.params.id)

  if (beat) {
    const alreadyReviewed = beat.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    beat.reviews.push(review)
    beat.numReviews = beat.reviews.length

    beat.rating =
      beat.reviews.reduce((acc, item) => item.rating + acc, 0) /
      beat.reviews.length

    await beat.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Beat not found')
  }
})

export {
  getBeats,
  getBeatById,
  deleteBeat,
  addBeat,
  updateBeat,
  createBeatReview,
}
