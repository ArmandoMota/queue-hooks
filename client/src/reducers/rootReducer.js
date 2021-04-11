import { combineReducers } from "redux";
import subs from "./subs";
import events from "./events";

const rootReducer = combineReducers({ subs, events });

export default rootReducer;
