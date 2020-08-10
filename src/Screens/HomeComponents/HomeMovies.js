import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loading from "../../Components/Loading";
import Error from "../../Components/Error";
import Poster from "../../Components/Poster";
import useAxios from "../../Hooks/useAxios";
import { constructTMDBPosterUrl } from "../../Utils/utils";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;
`;

const HomeMovies = ({ api }) => {
  const { loading, data, error } = useAxios(api);

  return error ? (
    <Error msg={error} />
  ) : loading ? (
    <Loading />
  ) : (
    <GridContainer>
      {data.results.map((movie, idx) => (
        <Poster
          key={movie.id}
          id={movie.id}
          title={movie.title}
          posterImage={constructTMDBPosterUrl(movie.poster_path)}
          releaseDate={movie.release_date}
          voteAverage={movie.vote_average}
          isMovie={true}
        />
      ))}
    </GridContainer>
  );
};

HomeMovies.propType = {
  api: PropTypes.func.isRequired,
};

export default HomeMovies;
