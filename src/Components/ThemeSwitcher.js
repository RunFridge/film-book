import React, { useContext } from "react";
import { AppContext } from "../Style/AppProvider";

const ThemeSwitcher = () => {
  const { toggleTheme } = useContext(AppContext);
  const handleThemeChange = () => {
    toggleTheme();
  };
  return (
    <div>
      <button onClick={handleThemeChange}>Toggle Theme</button>
    </div>
  );
};

export default ThemeSwitcher;
