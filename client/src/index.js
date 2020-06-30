import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Route from "./Routes";
import { StateProvider } from "./components/auth/protected/Store";

ReactDOM.render(
  <React.StrictMode>
    <StateProvider>
      <Route />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
