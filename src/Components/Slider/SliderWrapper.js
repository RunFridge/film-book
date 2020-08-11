import React from "react";
import PropTypes from "prop-types";
import Loading from "../Loading";
import Error from "../Error";
import useAxios from "../../Hooks/useAxios";
import PosterSlider from "./PosterSlider";

const SliderWrapper = ({ api, isMovie }) => {
  const { loading, data, error } = useAxios(api);

  return error ? (
    <Error msg={error} />
  ) : loading ? (
    <Loading />
  ) : (
    <PosterSlider
      array={data.results}
      phonePerView={2}
      tabletPerView={5}
      desktopPerView={6}
      spacing={30}
      isMovie={isMovie}
    />
  );
};

SliderWrapper.propType = {
  api: PropTypes.func.isRequired,
  isMovie: PropTypes.bool,
};

export default SliderWrapper;
