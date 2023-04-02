import express from 'express'
import multer from 'multer'
import path from 'path'
const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'frontend/public/audio')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

function checkFileType(file, cb) {
  const filetypes = /mp3|mpeg|m4a|wav/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Audio only!')
  }
}
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

router.post('/', upload.single('audio'), (req, res) => {
  res.send(`/audio/${req.file.filename}`)
})

export default router
