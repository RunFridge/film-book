import React, { createContext, useState } from "react";
import { ThemeProvider } from "styled-components";
import { useLocalStorage } from "../Hooks/useLocalStorage";
import theme from "./theme";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const localTheme = localStorage.getItem("Theme");
  const [currentLS, setCurrentLS] = useLocalStorage(
    "Theme",
    localTheme ? localTheme : "light"
  );
  const [themeMode, setThemeMode] = useState(currentLS);

  const toggleTheme = () => {
    setThemeMode((prevState) => {
      if (prevState === "light") {
        setCurrentLS("dark");
        return "dark";
      } else {
        setCurrentLS("light");
        return "light";
      }
    });
  };

  const value = { toggleTheme };
  const currentTheme = theme[themeMode];

  return (
    <AppContext.Provider value={value}>
      <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>
    </AppContext.Provider>
  );
};

export default AppProvider;
