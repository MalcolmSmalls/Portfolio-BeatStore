import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FormContainer } from '../components'
import { listBeatDetails, updateBeat } from '../actions/beatActions'
import { BEAT_UPDATE_RESET } from '../constants/beatConstants'
import axios from 'axios'

export default function BeatEditScreen() {
  const { id } = useParams()
  const [price, setPrice] = useState(0)
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [file, setFile] = useState('')
  const [key, setKey] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState([])
  const [typeBeat, setTypeBeat] = useState('')
  const [BPM, setBPM] = useState(120)
  const [uploading, setUploading] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const beatDetails = useSelector((state) => state.beatDetails)
  const { loading, error, beat } = beatDetails

  const beatUpdate = useSelector((state) => state.beatUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = beatUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: BEAT_UPDATE_RESET })
      navigate('/admin/beatList')
    } else {
      if (!beat.name || beat._id !== id) {
        dispatch(listBeatDetails(id))
      } else {
        setName(beat.name)
        setImage(beat.image)
        setFile(beat.file)
        setKey(beat.key)
        setDescription(beat.description)
        setTags(beat.tags)
        setTypeBeat(beat.typeBeat)
        setBPM(beat.bpm)
      }
    }
  }, [dispatch, id, beat, successUpdate, navigate])
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateBeat({
        _id: id,
        name,
        price,
        image,
        file,
        BPM,
        key,
        description,
        tags,
        typeBeat,
      })
    )
  }
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const { data } = await axios.post('/api/upload', formData, config)
      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  return (
    <>
      <Link to='/admin/beatlist'>Go Back</Link>
      <FormContainer>
        <h1 className='text-9xl mt-10 text-golden'>Edit Beat</h1>
        {loadingUpdate && <h2>Loading...</h2>}
        {errorUpdate && <h2>{errorUpdate}</h2>}
        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h2 className='text-red-500'>{error}</h2>
        ) : (
          <form
            onSubmit={submitHandler}
            className='flex items-center flex-col w-[30%] font-Poppins'
          >
            <label htmlFor='name' className='text-sm uppercase font-bold'>
              Name
            </label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Enter your name'
              id='name'
              className='border-2 rounded p-1 w-[80%] mb-5'
            />
            <label htmlFor='price' className='text-sm uppercase font-bold'>
              Price
            </label>
            <input
              type='number'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder='Enter your price'
              id='price'
              className='border-2 rounded p-1 w-[80%] mb-5'
            />
            <label htmlFor='image' className='text-sm uppercase font-bold'>
              Image
            </label>
            <input
              type='text'
              placeholder='Enter image url'
              onChange={(e) => setImage(e.target.value)}
              id='image'
              value={image}
              className='border-2 rounded p-1 w-[80%]'
            />
            <input type='file' id='image-file' onChange={uploadFileHandler} />
            {uploading && <span>Loading...</span>}
            <label htmlFor='file' className='text-sm uppercase font-bold'>
              File
            </label>
            <input
              type='text'
              placeholder='Enter file url'
              onChange={(e) => setFile(e.target.value)}
              id='file'
              value={file}
              className='border-2 rounded p-1 w-[80%]'
            />

            <label htmlFor='key' className='text-sm uppercase font-bold'>
              Key
            </label>
            <input
              type='text'
              placeholder='Enter key'
              onChange={(e) => setKey(e.target.value)}
              id='key'
              value={key}
              className='border-2 rounded p-1 w-[80%]'
            />
            <label
              htmlFor='description'
              className='text-sm uppercase font-bold'
            >
              Description
            </label>
            <input
              type='text'
              placeholder='Enter description'
              onChange={(e) => setDescription(e.target.value)}
              id='description'
              value={description}
              className='border-2 rounded p-1 w-[80%]'
            />
            <label htmlFor='bpm' className='text-sm uppercase font-bold'>
              BPM
            </label>
            <input
              type='number'
              placeholder='Enter BPM'
              onChange={(e) => setBPM(e.target.value)}
              id='bpm'
              value={BPM}
              className='border-2 rounded p-1 w-[80%]'
            />
            <label htmlFor='tags1' className='text-sm uppercase font-bold'>
              Tags:
            </label>
            <input
              type='text'
              placeholder='Enter tag 1'
              onChange={(e) => setTags(e.target.value)}
              id='tags1'
              value={tags[0]}
              className='border-2 rounded p-1 w-[80%]'
            />
            <input
              type='text'
              placeholder='Enter tag 2'
              onChange={(e) => setTags(e.target.value)}
              id='tags2'
              value={tags[1]}
              className='border-2 rounded p-1 w-[80%]'
            />
            <input
              type='text'
              placeholder='Enter tag 3'
              onChange={(e) => setTags(e.target.value)}
              id='tags3'
              value={tags[2]}
              className='border-2 rounded p-1 w-[80%]'
            />
            <label htmlFor='typeBeat1' className='text-sm uppercase font-bold'>
              Type Beat:
            </label>
            <input
              type='text'
              placeholder='Enter typeBeat 1'
              onChange={(e) => setTypeBeat(e.target.value)}
              id='typeBeat1'
              value={typeBeat[0]}
              className='border-2 rounded p-1 w-[80%]'
            />
            <input
              type='text'
              placeholder='Enter typeBeat 2'
              onChange={(e) => setTypeBeat(e.target.value)}
              id='typeBeat2'
              value={typeBeat[1]}
              className='border-2 rounded p-1 w-[80%]'
            />
            <input
              type='text'
              placeholder='Enter typeBeat 3'
              onChange={(e) => setTypeBeat(e.target.value)}
              id='typeBeat3'
              value={typeBeat[2]}
              className='border-2 rounded p-1 w-[80%]'
            />
            <button
              type='submit'
              className='uppercase block  bg-lighter-dark  text-white p-3 rounded-lg text-sm font-bold tracking-widest hover:bg-main-dark w-[80%] mt-5 mb-10 '
            >
              Update
            </button>
          </form>
        )}
      </FormContainer>
    </>
  )
}
