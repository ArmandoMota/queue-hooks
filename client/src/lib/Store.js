// Import root reducer
// Do something to create Store (createStore?)
// Export store
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers/rootReducer";

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
