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
