import mongoose from 'mongoose'

// tags may need to have a different id each tag, may need to figure that out how to use them in tagSchema in the future same with typeBeat

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String },
  },
  { timestamps: true }
)

const tagSchema = mongoose.Schema({
  name: { type: String, required: true },
})

const typeBeatSchema = mongoose.Schema({
  name: { type: String, required: true },
})

const beatSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
    bpm: {
      type: Number,
      default: 120,
    },
    key: {
      type: String,
    },
    description: {
      type: String,
    },
    tags: [String],
    typeBeat: [String],
    reviews: [reviewSchema],
    price: {
      type: Number,
      required: true,
      default: 29.99,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Beat = mongoose.model('Beat', beatSchema)

export default Beat
