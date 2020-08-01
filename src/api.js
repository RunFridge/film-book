import axios from "axios";

const naverApi = axios.create({
  baseURL: "/api/v1/",
  timeout: 5000,
  headers: {
    "X-Naver-Client-Id": process.env.REACT_APP_NAVER_CLIENT_ID,
    "X-Naver-Client-Secret": process.env.REACT_APP_NAVER_CLIENT_SECRET,
  },
});

export const getMovieSearch = (query) =>
  naverApi.get("search/movie.json", { params: { query } });

const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: process.env.REACT_APP_THEMOVIEDB_APIKEY,
    language: "ko-KR",
  },
});

export const tmdbMoviesApi = {
  nowPlaying: () => tmdbApi.get("movie/now_playing"),
  upcoming: () => tmdbApi.get("movie/upcoming"),
  popular: () => tmdbApi.get("movie/popular"),
  movieDetail: (id) =>
    tmdbApi.get(`movie/${id}`, {
      params: {
        append_to_response: "videos",
      },
    }),
  search: (term) =>
    tmdbApi.get("search/movie", {
      params: {
        // themoviedb API aitomatically URIencodes search term
        query: term,
      },
    }),
};

export const tmdbTVApi = {
  topRated: () => tmdbApi.get("tv/top_rated"),
  popular: () => tmdbApi.get("tv/popular"),
  airingToday: () => tmdbApi.get("tv/airing_today"),
  showDetail: (id) =>
    tmdbApi.get(`tv/${id}`, {
      params: {
        append_to_response: "videos",
      },
    }),
  search: (term) =>
    tmdbApi.get("search/tv", {
      params: {
        // themoviedb API aitomatically URIencodes search term
        query: term,
      },
    }),
};
