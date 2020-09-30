import { Theme } from "../@types/style";

const theme: { light: Theme; dark: Theme } = {
  light: {
    enabled: "#292A32",
    disabled: "#A5A5AA",
    primary: "#FF0558",
    bgPrimary: "#FFF",
    bgSecondary: "#F5F5F5",
    navColor: "rgba(255, 255, 255, .8)",
    borderColor: "#d2d2d2",
  },
  dark: {
    enabled: "#FFF",
    disabled: "#7A7B88",
    primary: "#FF0558",
    bgPrimary: "#2B2D42",
    bgSecondary: "#43455F",
    navColor: "rgba(0, 0, 0, 0.8)",
    borderColor: "#d2d2d2",
  },
};

export default theme;
