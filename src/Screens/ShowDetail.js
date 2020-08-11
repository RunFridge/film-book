import React from "react";
import useAxios from "../Hooks/useAxios";
import { tmdbTVApi } from "../api";

const ShowDetail = ({
  match: {
    params: { id },
  },
}) => {
  const { loading, data, error } = useAxios(function () {
    return tmdbTVApi.showDetail(id);
  });
  console.log(loading, data, error);
  return <h1>ShowDetail</h1>;
};

export default ShowDetail;
