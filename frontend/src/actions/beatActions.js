import axios from 'axios'
import {
  BEAT_ADD_FAIL,
  BEAT_ADD_REQUEST,
  BEAT_ADD_SUCCESS,
  BEAT_CREATE_REVIEW_FAIL,
  BEAT_CREATE_REVIEW_REQUEST,
  BEAT_CREATE_REVIEW_SUCCESS,
  BEAT_DELETE_FAIL,
  BEAT_DELETE_REQUEST,
  BEAT_DELETE_SUCCESS,
  BEAT_DETAILS_FAIL,
  BEAT_DETAILS_REQUEST,
  BEAT_DETAILS_SUCCESS,
  BEAT_LIST_FAIL,
  BEAT_LIST_REQUEST,
  BEAT_LIST_SUCCESS,
  BEAT_UPDATE_FAIL,
  BEAT_UPDATE_REQUEST,
  BEAT_UPDATE_SUCCESS,
} from '../constants/beatConstants'

export const listBeats =
  (keyword = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: BEAT_LIST_REQUEST })
      const { data } = await axios.get(`/api/beats?keyword=${keyword}`)

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

export const listBeatDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: BEAT_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/beats/${id}`)
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

export const deleteBeat = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BEAT_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.delete(`/api/beats/${id}`, config)

    dispatch({
      type: BEAT_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: BEAT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const addBeat = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: BEAT_ADD_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.post(`/api/beats/`, {}, config)

    dispatch({
      type: BEAT_ADD_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BEAT_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateBeat = (beat) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BEAT_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.put(`/api/beats/${beat._id}`, beat, config)

    dispatch({
      type: BEAT_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BEAT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createBeatReview =
  (beatId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: BEAT_CREATE_REVIEW_REQUEST,
      })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      await axios.post(`/api/beats/${beatId}/reviews`, review, config)

      dispatch({
        type: BEAT_CREATE_REVIEW_SUCCESS,
      })
    } catch (error) {
      dispatch({
        type: BEAT_CREATE_REVIEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
