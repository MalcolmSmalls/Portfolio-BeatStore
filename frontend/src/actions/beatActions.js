import axios from 'axios'
import {
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
