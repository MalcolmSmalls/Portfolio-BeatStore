const express = require('express')
const app = express()
const beats = require('./data/beats.js')
var cors = require('cors')

app.use(cors())

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

app.listen(5000, console.log('Server running on port 5000'))
