import React from "react";
import PropTypes from "prop-types";
import Loading from "../../Components/Loading";
import Error from "../../Components/Error";
import useAxios from "../../Hooks/useAxios";
import PosterSlider from "../../Components/PosterSlider";

const HomeMovies = ({ api }) => {
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
      spacing={15}
      isMovie={true}
    />
  );
};

HomeMovies.propType = {
  api: PropTypes.func.isRequired,
};

export default HomeMovies;
