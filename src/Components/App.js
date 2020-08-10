import React from "react";
import GlobalStyle from "../Style/GlobalStyle";
import Router from "./Router";
import Footer from "./Footer";
import ThemeSwitcher from "./ThemeSwitcher";

const App = () => {
  return (
    <>
      <ThemeSwitcher />
      <GlobalStyle />
      <Router />
      <Footer />
    </>
  );
};

export default App;
