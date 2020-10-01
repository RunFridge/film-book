const customeMediaQuery = (minWidth: number): string =>
  `@media only screen and (min-width: ${minWidth}px)`;

export const responsiveOn = {
  custom: customeMediaQuery,
  desktop: customeMediaQuery(550),
};
