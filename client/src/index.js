import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./lib/Store";
import App from "./App";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
});
