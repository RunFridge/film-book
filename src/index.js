import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import AppProvider from "./Style/AppProvider";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>,
  rootElement
);
