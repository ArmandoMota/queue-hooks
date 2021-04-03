import * as types from "../constants/ActionTypes";

export default function subs(state = [], action) {
  switch (action.type) {
    case types.GET_SUBS_SUCCESS:
      return action.subs;
    case types.CREATE_SUB_SUCCESS:
      return [...state, action.sub];
    default:
      return state;
  }
}
