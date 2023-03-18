import express from 'express'
import dotenv from 'dotenv'
import beats from './data/beats.js'
import connectDB from './config/db.js'
import colors from 'colors'

dotenv.config()
connectDB()
const app = express()

app.get('/', (req, res) => {
  res.send('API is running.')
})

app.get('/api/beats', (req, res) => {
  res.json(beats)
})

app.get('/api/beats/:id', (req, res) => {
  const beat = beats.find((b) => b._id === req.params.id)
  res.json(beat)
})

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
