import React, { createContext, ReactElement, useState } from "react";

export const AppContext = createContext<{
  themeString: string;
  changeTheme: Function;
} | null>(null);

const getLSTheme = (): string | null => localStorage.getItem("theme");
const saveLSTheme = (themeString: string) =>
  localStorage.setItem("theme", themeString);

const AppProvider = ({
  children,
}: {
  children: ReactElement;
}): ReactElement => {
  const savedTheme = getLSTheme();
  const [themeString, setTheme] = useState(savedTheme ? savedTheme : "light");
  if (!savedTheme) {
    saveLSTheme(themeString);
  }

  const changeTheme = (themeString: string) => {
    saveLSTheme(themeString);
    setTheme(themeString);
  };
  const value = { themeString, changeTheme };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
