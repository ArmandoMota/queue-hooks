import api from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

export const getEventsSuccess = (events) => {
  return { type: types.GET_EVENTS_SUCCESS, events };
};

export const getEventsRequest = () => {
  return { type: types.GET_EVENTS_REQUEST };
};

export const getEvents = () => {
  return (dispatch) => {
    dispatch(getEventsRequest());
    api.getEvents((data) => {
      dispatch(getEventsSuccess(data.events));
    });
  };
};
