import React from "react";
import useAxios from "../Hooks/useAxios";
import { tmdbTVApi } from "../api";
import Loading from "../Components/Loading";
import Detail from "./Detail";
import Error from "../Components/Error";

const ShowDetail = ({
  match: {
    params: { id },
  },
}) => {
  const { loading, data, error } = useAxios(function () {
    return tmdbTVApi.showDetail(id);
  });
  return loading ? (
    <Loading />
  ) : error ? (
    <Error />
  ) : (
    <>
      <Detail data={data} />
    </>
  );
};

export default ShowDetail;
