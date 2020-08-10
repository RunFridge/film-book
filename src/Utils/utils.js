export const constructTMDBPosterUrl = (url, width) => {
  const baseUrl = `https://image.tmdb.org/t/p/w${width}/`;
  if (url) return baseUrl + url;
  else return require("../Assets/noPosterSmall.png");
};
