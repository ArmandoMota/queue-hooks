import * as types from "../constants/ActionTypes";

export default function events(state = [], action) {
  switch (action.type) {
    case types.GET_EVENTS_SUCCESS:
      return action.events;
    default:
      return state;
  }
}
