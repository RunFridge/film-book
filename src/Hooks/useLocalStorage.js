import { useState, useEffect } from "react";

export const useLocalStorage = (name, initialValue) => {
  const [currentLS, setCurrentLS] = useState(initialValue);
  localStorage.setItem(name, initialValue);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => localStorage.setItem(name, currentLS), [currentLS]);

  return [currentLS, setCurrentLS];
};
