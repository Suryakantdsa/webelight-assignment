import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import { Provider } from "react-redux";
import store from "./src/utils/Store/Store";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
