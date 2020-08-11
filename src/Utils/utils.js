export const constructTMDBPosterUrl = (url, width) => {
  // build TMDB image URL based on image endpoint
  const baseUrl = `https://image.tmdb.org/t/p/w${width}/`;
  if (url) return baseUrl + url;
  else return require("../Assets/noPosterSmall.png");
};

export const parsePx = (pxSize) => {
  // Parses px sized String to Number (i.e. "800px" to 800)
  return parseInt(pxSize.replace("px", ""), 10);
};

export const parseQuery = (query) => {
  if (query.includes("query")) {
    return decodeURI(query.split("=")[1]).replace(/\+/gi, " ");
  }
};

export const zerosArr = (len) => new Array(len).fill(0);
