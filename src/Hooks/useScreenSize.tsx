import { useState, useCallback, useEffect } from "react";
import { size } from "../Styles/Responsive";

const useScreenSize = (): [number, number] => {
  /*
    Updates screen width and height as it resizes
    returns [Width, height]
  */
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const onResize = useCallback(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  });

  return [width, height];
};

export default useScreenSize;

export const isMobile = (): boolean => {
  /* R
    Retrun true if screen is mobile
  */
  const [width, _] = useScreenSize();
  if (width <= size.maxPhone) {
    return true;
  }
  return false;
};
