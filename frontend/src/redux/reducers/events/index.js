import * as actionTypes from '../../types/events';

const initialState = {
  loading: false,
  events: [],
  filtered: [],
  error: null,
  msg: null
}

const eventsReducer = function(state=initialState, action) {
  switch (action.type) {
    case actionTypes.EVENTS_LIST_REQUEST:
    case actionTypes.EVENTS_ADD_REQUEST:
      return {
        ...state,
        loading: true
      };
    case actionTypes.EVENTS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        events: action.payload.events,
        filtered: action.payload.filtered
      }
    case actionTypes.EVENTS_LIST_FAIL:
      return {
        ...state,
        events: [],
        filtered: []
      }
    case actionTypes.FILTER_CAT_CHANGE:
      return {
        ...state,
        filtered: action.payload
      }
    case actionTypes.FILTER_TYPE_CHANGE:
      return {
        ...state,
        filtered: action.payload
      }
    case actionTypes.EVENTS_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: action.payload.message
      }
    case actionTypes.EVENTS_ADD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }
    default:
      return state;
  }
}

export default eventsReducer;