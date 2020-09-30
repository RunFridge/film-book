import React, { ReactElement } from "react";
import { ThemeProvider } from "styled-components";
import Theme from "./Styles/Theme";
import Footer from "./Components/Footer";
import Router from "./Components/Router";
import Header from "./Components/Header";
import GlobalStyle from "./Styles/GlobalStyle";

const App = (): ReactElement => {
  return (
    <>
      {/* For now, theme is set for light mode */}
      <ThemeProvider theme={Theme.light}>
        <GlobalStyle />
        <Header />
        <Router />
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default App;
