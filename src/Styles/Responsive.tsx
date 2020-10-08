/* Concept from https://jsramblings.com/how-to-use-media-queries-with-styled-components/ */
export const size = {
  minPhone: 375,
  maxPhone: 899,
  minTablet: 900,
  maxTablet: 1499,
  minDesktop: 1500,
  maxDesktop: 5500,
};

export const device = {
  custom: (minWidth: number, maxWidth: number): string =>
    `@media screen and (min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`,
  phone: `@media screen and (min-width: ${size.minPhone}px) and (max-width: ${size.maxPhone}px)`,
  tablet: `@media screen and (min-width: ${size.minTablet}px) and (max-width: ${size.maxTablet}px)`,
  desktop: `@media screen and (min-width: ${size.minDesktop}px) and (max-width: ${size.maxDesktop}px)`,
};
