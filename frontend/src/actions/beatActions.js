import axios from 'axios'
import {
  BEAT_DETAILS_FAIL,
  BEAT_DETAILS_REQUEST,
  BEAT_DETAILS_SUCCESS,
  BEAT_LIST_FAIL,
  BEAT_LIST_REQUEST,
  BEAT_LIST_SUCCESS,
} from '../constants/beatConstants'

export const listBeats = () => async (dispatch) => {
  try {
    dispatch({ type: BEAT_LIST_REQUEST })

    const { data } = await axios.get('/api/beats')

    dispatch({ type: BEAT_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: BEAT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listBeatDetails = () => async (dispatch) => {
  try {
    dispatch({ type: BEAT_DETAILS_REQUEST })

    const { data } = await axios.get('/api/beats')

    dispatch({ type: BEAT_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: BEAT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
