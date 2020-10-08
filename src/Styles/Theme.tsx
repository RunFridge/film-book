import { Theme } from "../@types/style";

const theme: { [index: string]: any; light: Theme; dark: Theme } = {
  light: {
    enabled: "#292A32",
    disabled: "#A5A5AA",
    primary: "#FF0558",
    bgPrimary: "#FFF",
    bgSecondary: "#F5F5F5",
    navColor: "rgba(255, 255, 255, .99)",
    borderColor: "#d2d2d2",
    textShadow: "rgba(0, 0, 0, 0.3)",
  },
  dark: {
    enabled: "#FFF",
    disabled: "#7A7B88",
    primary: "#FF0558",
    bgPrimary: "#141414",
    bgSecondary: "#43455F",
    navColor: "rgba(0, 0, 0, 0.99)",
    borderColor: "#d2d2d2",
    textShadow: "rgba(255, 5, 88, 0.3)",
  },
};

export default theme;
