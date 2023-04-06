import {
  BEAT_ADD_FAIL,
  BEAT_ADD_REQUEST,
  BEAT_ADD_RESET,
  BEAT_ADD_SUCCESS,
  BEAT_CREATE_REVIEW_FAIL,
  BEAT_CREATE_REVIEW_REQUEST,
  BEAT_CREATE_REVIEW_RESET,
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
  BEAT_UPDATE_RESET,
  BEAT_UPDATE_SUCCESS,
} from '../constants/beatConstants'

export const beatListReducer = (state = { beats: [] }, action) => {
  switch (action.type) {
    case BEAT_LIST_REQUEST:
      return { loading: true, beats: [] }
    case BEAT_LIST_SUCCESS:
      return {
        loading: false,
        beats: action.payload.beats,
        pages: action.payload.pages,
        page: action.payload.page,
      }
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

export const beatDeleteReducer = (
  state = { beat: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case BEAT_DELETE_REQUEST:
      return { loading: true }
    case BEAT_DELETE_SUCCESS:
      return { loading: false, success: true }
    case BEAT_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const beatAddReducer = (state = {}, action) => {
  switch (action.type) {
    case BEAT_ADD_REQUEST:
      return { loading: true }
    case BEAT_ADD_SUCCESS:
      return { loading: false, success: true, beat: action.payload }
    case BEAT_ADD_FAIL:
      return { loading: false, error: action.payload }
    case BEAT_ADD_RESET:
      return {}
    default:
      return state
  }
}

export const beatUpdateReducer = (state = { beat: {} }, action) => {
  switch (action.type) {
    case BEAT_UPDATE_REQUEST:
      return { loading: true }
    case BEAT_UPDATE_SUCCESS:
      return { loading: false, success: true, beat: action.payload }
    case BEAT_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case BEAT_UPDATE_RESET:
      return { beat: {} }
    default:
      return state
  }
}

export const beatCreateReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case BEAT_CREATE_REVIEW_REQUEST:
      return { loading: true }
    case BEAT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true }
    case BEAT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    case BEAT_CREATE_REVIEW_RESET:
      return {}
    default:
      return state
  }
}
