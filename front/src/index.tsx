import React from "react";
import ReactDOM from "react-dom";
import { App } from "@app";
import { GlobalStyles } from "@app/app.styled";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>,
  document.querySelector(".root")
);
