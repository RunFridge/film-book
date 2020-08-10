/* Concept from https://jsramblings.com/how-to-use-media-queries-with-styled-components/ */
const size = {
  minPhone: "375px",
  maxPhone: "899px",
  minTablet: "900px",
  maxTablet: "1499px",
  minDesktop: "1500px",
  maxDesktop: "5500px",
};

export const device = {
  phone: `screen and (min-width: ${size.minPhone}) and (max-width: ${size.maxPhone})`,
  tablet: `screen and (min-width: ${size.minTablet}) and (max-width: ${size.maxTablet})`,
  desktop: `screen and (min-width: ${size.minDesktop}) and (max-width: ${size.maxDesktop})`,
};
