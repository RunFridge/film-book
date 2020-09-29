import React, { ReactElement } from "react";
import Footer from "./Components/Footer";
import Router from "./Components/Router";
import Header from "./Components/Header";
import GlobalStyle from "./Styles/GlobalStyle";

const App = (): ReactElement => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Router />
      <Footer />
    </>
  );
};

export default App;
