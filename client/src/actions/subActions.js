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

export const deleteSubSuccess = (id) => {
  return { type: types.DELETE_SUB_SUCCESS, id };
};

export const deleteSubRequest = () => {
  return { type: types.DELETE_SUB_REQUEST };
};

export const deleteSub = (subId) => {
  return (dispatch) => {
    dispatch(deleteSubRequest());
    api.deleteSubscription(subId, () => {
      dispatch(deleteSubSuccess(subId));
    });
  };
};
