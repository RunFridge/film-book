export const constructTMDBPosterUrl = (url) => {
  const baseUrl = "https://image.tmdb.org/t/p/w200/";
  if (url) return baseUrl + url;
  else return require("../Assets/noPosterSmall.png");
};
