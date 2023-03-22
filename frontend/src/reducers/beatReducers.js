import {
  BEAT_LIST_FAIL,
  BEAT_LIST_REQUEST,
  BEAT_LIST_SUCCESS,
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
