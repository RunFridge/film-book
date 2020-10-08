import React, { ReactElement, useState } from "react";
import { ThemeProvider } from "styled-components";
import theme from "./Styles/Theme";

// Components
import Footer from "./Components/Footer";
import Router from "./Components/Router";
import Header from "./Components/Header";
import GlobalStyle from "./Styles/GlobalStyle";

// Hooks
import useThemeSwitcher from "./Hooks/useThemeSwitcher";

const App = (): ReactElement => {
  const { themeString } = useThemeSwitcher();

  return (
    <>
      <ThemeProvider theme={theme[themeString]}>
        <GlobalStyle />
        <Header />
        <Router />
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default App;
