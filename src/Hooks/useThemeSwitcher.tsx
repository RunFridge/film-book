import { useContext } from "react";
import { AppContext } from "../AppProvider";

const useThemeSwitcher = () => {
  const state = useContext(AppContext);
  if (!state) throw new Error("Cannot Find AppContext!");
  return state;
};

export default useThemeSwitcher;
