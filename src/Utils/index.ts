// The Movie Database Image URI generation
const BASE_URL = "http://image.tmdb.org/t/p/";
export const posterSizes = {
  w92: "w92",
  w154: "w154",
  w185: "w185",
  w342: "w342",
  w500: "w500",
  w780: "w780",
  original: "original",
};
export const backdropSizes = {
  w300: "w300",
  w780: "w780",
  w1280: "w1280",
  original: "original",
};
export const constructImageUri = (posterPath: string, size: string): string =>
  BASE_URL + size + `/${posterPath}`;

// Shorten long string
export const shortenLongText = (limit: number, originStr: string): string => {
  if (originStr.length >= limit) {
    return originStr.slice(0, limit - 3) + "...";
  }
  return originStr;
};
