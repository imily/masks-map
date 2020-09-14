import React from "react";
import ReactDOM from "react-dom";
import { StoreContext } from "redux-react-hook";
import App from "./App";
import Store from "./Redux/Store";

ReactDOM.render(
  <StoreContext.Provider value={Store}>
    <App />
  </StoreContext.Provider>,
  document.getElementById("root")
);
