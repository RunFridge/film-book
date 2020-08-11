import React from "react";
import useAxios from "../Hooks/useAxios";
import { tmdbPeopleApi } from "../api";

const PersonDetail = ({
  match: {
    params: { id },
  },
}) => {
  const { loading, data, error } = useAxios(function () {
    return tmdbPeopleApi.personDetail(id);
  });
  console.log(loading, data, error);
  return <h1>PersonDetail</h1>;
};

export default PersonDetail;
