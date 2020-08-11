import React from "react";
import GlobalStyle from "../Style/GlobalStyle";
import Router from "./Router";
import Footer from "./Footer";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Router />
      <Footer />
    </>
  );
};

export default App;
