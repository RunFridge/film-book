import axios from "axios";

// Naver Developer API
const naverAxios = axios.create({
  baseURL: "/api/v1/", // View setupProxy.js for full URL
  timeout: 5000,
  headers: {
    "X-Naver-Client-Id": process.env.REACT_APP_NAVER_CLIENT_ID,
    "X-Naver-Client-Secret": process.env.REACT_APP_NAVER_CLIENT_SECRET,
  },
});

export const naverMovieApi = {
  search: (term) =>
    naverAxios.get("search/movie.json", {
      params: { query: term },
    }),
};

// The Movie DB API
const tmdbAxios = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: process.env.REACT_APP_THEMOVIEDB_APIKEY,
    language: "ko-KR",
    region: "KR",
  },
});

export const tmdbMoviesApi = {
  nowPlaying: () => tmdbAxios.get("movie/now_playing"),
  upcoming: () => tmdbAxios.get("movie/upcoming"),
  popular: () => tmdbAxios.get("movie/popular"),
  movieDetail: (id) =>
    tmdbAxios.get(`movie/${id}`, {
      params: {
        append_to_response: "videos",
      },
    }),
  search: (term) =>
    tmdbAxios.get("search/movie", {
      params: {
        // themoviedb API aitomatically URIencodes search term
        query: term,
      },
    }),
};

export const tmdbTVApi = {
  topRated: () => tmdbAxios.get("tv/top_rated"),
  popular: () => tmdbAxios.get("tv/popular"),
  airingToday: () => tmdbAxios.get("tv/airing_today"),
  showDetail: (id) =>
    tmdbAxios.get(`tv/${id}`, {
      params: {
        append_to_response: "videos",
      },
    }),
  search: (term) =>
    tmdbAxios.get("search/tv", {
      params: {
        // themoviedb API aitomatically URIencodes search term
        query: term,
      },
    }),
};

// KOBIS API
const kobisAxios = axios.create({
  baseURL: "http://www.kobis.or.kr/kobisopenapi/webservice/rest/",
  params: {
    key: process.env.REACT_APP_KOBIS_APIKEY,
  },
});

export const kobisApi = {
  getPerson: (name) =>
    kobisAxios.get("people/searchPeopleList.json", {
      params: {
        peopleNm: name,
      },
    }),
  getPersonDetail: (id) =>
    kobisAxios.get("people/searchPeopleInfo.json", {
      params: {
        peopleCd: id,
      },
    }),
};
