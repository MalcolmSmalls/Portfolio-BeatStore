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

export { getBeats, getBeatById, deleteBeat, addBeat, updateBeat }
