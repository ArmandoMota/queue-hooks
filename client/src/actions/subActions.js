import api from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

export const createSubSuccess = (sub) => {
  return { type: types.CREATE_SUB_SUCCESS, sub };
};

export const createSubRequest = () => {
  return { type: types.CREATE_SUB_REQUEST };
};

export const createSub = (data, callback) => {
  return (dispatch) => {
    dispatch(createSubRequest());
    api.addSubscription(data, (newSub) => {
      dispatch(createSubSuccess(newSub));

      if (callback) {
        callback();
      }
    });
  };
};

export const getSubsSuccess = (subs) => {
  return { type: types.GET_SUBS_SUCCESS, subs };
};

export const getSubsRequest = () => {
  return { type: types.GET_SUBS_REQUEST };
};

export const getSubs = () => {
  return (dispatch) => {
    dispatch(getSubsRequest());
    api.getSubscriptions((data) => {
      dispatch(getSubsSuccess(data.subs));
    });
  };
};
