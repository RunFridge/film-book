/* Concept from https://jsramblings.com/how-to-use-media-queries-with-styled-components/ */
export const size = {
  minPhone: "375px",
  maxPhone: "899px",
  minTablet: "900px",
  maxTablet: "1499px",
  minDesktop: "1500px",
  maxDesktop: "5500px",
};

export const device = {
  custom: (minWidth: number, maxWidth: number): string =>
    `@media screen and (min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`,
  phone: `@media screen and (min-width: ${size.minPhone}) and (max-width: ${size.maxPhone})`,
  tablet: `@media screen and (min-width: ${size.minTablet}) and (max-width: ${size.maxTablet})`,
  desktop: `@media screen and (min-width: ${size.minDesktop}) and (max-width: ${size.maxDesktop})`,
};
