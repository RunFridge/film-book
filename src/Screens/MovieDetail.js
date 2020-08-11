import React from "react";
import Loading from "../Components/Loading";
import useAxios from "../Hooks/useAxios";
import { tmdbMoviesApi } from "../api";
import Detail from "./Detail";
import Error from "../Components/Error";

const MovieDetail = ({
  match: {
    params: { id },
  },
}) => {
  const { loading, data, error } = useAxios(function () {
    return tmdbMoviesApi.movieDetail(id);
  });
  return loading ? (
    <Loading />
  ) : error ? (
    <Error />
  ) : (
    <>
      <Detail data={data} isMovie />
    </>
  );
};

export default MovieDetail;
