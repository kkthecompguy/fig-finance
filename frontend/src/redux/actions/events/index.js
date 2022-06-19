import axios from 'axios';
import { BASE_URL } from '..';
import * as actionTypes from '../../types/events';

export const listEvents = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.EVENTS_LIST_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.get(`${BASE_URL}events`, config);
    dispatch({ type: actionTypes.EVENTS_LIST_SUCCESS, payload: {
      events: res.data.data,
      filtered: res.data.data,
    } });
    return res.data.data;
  } catch (error) {
    console.log(error);
    dispatch({type: actionTypes.EVENTS_LIST_FAIL});
    return []
  }
}


export const queryEvents = (queryData) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.EVENTS_LIST_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.get(`${BASE_URL}events?title=${queryData.title}`, config);
    dispatch({ type: actionTypes.EVENTS_LIST_SUCCESS, payload: {
      events: res.data.data,
      filtered: res.data.data,
    } });
    return res.data.data;
  } catch (error) {
    console.log(error);
    dispatch({type: actionTypes.EVENTS_LIST_FAIL});
    return [];
  }
}


export const filterEvents = (data, filterType) => async (dispatch) => {
  if (filterType === "category") {
    dispatch({ type: actionTypes.FILTER_CAT_CHANGE, payload: data });
  } else {
    dispatch({ type: actionTypes.FILTER_TYPE_CHANGE, payload: data })
  }
}

export const addEvent = (eventData) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.EVENTS_ADD_REQUEST });
    const config = {
      headers : {
        "Content-Type": "application/json"
      }
    }

    const data = {
      title: eventData.title,
      category: eventData.category,
      description: eventData.description,
      date: eventData.eventDate,
      isVirtual: eventData.isVirtual,
      address: eventData.address
    }

    const res = await axios.post(`${BASE_URL}events/new`, data, config);
    dispatch({ type: actionTypes.EVENTS_ADD_SUCCESS, payload: {message: res.data.message} })
    return {success: true, message: res.data.message}
  } catch (error) {
    console.log(error);
    dispatch({ type: actionTypes.EVENTS_ADD_FAIL, payload: {error: "something went wrong"} });
    return {success: false, message: "something went wrong"};
  }
}