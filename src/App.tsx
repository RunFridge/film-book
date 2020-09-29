import React, { ReactElement } from "react";
import Router from "./Components/Router";
import GlobalStyle from "./Styles/GlobalStyle";

const App = (): ReactElement => {
  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
};

export default App;
