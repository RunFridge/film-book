import React from "react";
import useAxios from "../Hooks/useAxios";
import { tmdbMoviesApi } from "../api";

const MovieDetail = ({
  match: {
    params: { id },
  },
}) => {
  const { loading, data, error } = useAxios(function () {
    return tmdbMoviesApi.movieDetail(id);
  });
  console.log(loading, data, error);
  return <h1>MovieDetail</h1>;
};

export default MovieDetail;
