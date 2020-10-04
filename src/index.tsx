import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo";
import App from "./App";
import AppProvider from "./AppProvider";

ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <AppProvider>
        <App />
      </AppProvider>
    </ApolloProvider>
  </Router>,
  document.getElementById("root")
);
