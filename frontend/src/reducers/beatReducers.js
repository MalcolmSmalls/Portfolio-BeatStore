import {
  BEAT_LIST_FAIL,
  BEAT_LIST_REQUEST,
  BEAT_LIST_SUCCESS,
} from '../constants/beatConstants'

import {
  BEAT_DETAILS_FAIL,
  BEAT_DETAILS_REQUEST,
  BEAT_DETAILS_SUCCESS,
} from '../constants/beatConstants'

export const beatListReducer = (state = { beats: [] }, action) => {
  switch (action.type) {
    case BEAT_LIST_REQUEST:
      return { loading: true, beats: [] }
    case BEAT_LIST_SUCCESS:
      return { loading: false, beats: action.payload }
    case BEAT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const beatDetailsReducer = (
  state = { beat: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case BEAT_DETAILS_REQUEST:
      return { loading: true, ...state }
    case BEAT_DETAILS_SUCCESS:
      return { loading: false, beat: action.payload }
    case BEAT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
