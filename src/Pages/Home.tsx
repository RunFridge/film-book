import React, { ReactElement } from "react";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";

// Utilities
import { constructImageUri, posterSizes } from "../Utils";

// Components
import Loading from "../Components/Loading";
import Error from "../Components/Error";
import { MovieSlider } from "../Components/Slider";

/*
==========================
    GraphQL query
==========================
*/
const HOME_QUERY = gql`
  query {
    popularMovies {
      id
      title
      poster_path
      vote_average
    }
    nowPlayingMovies {
      id
      title
      poster_path
      vote_average
    }
    upcomingMovies {
      id
      title
      poster_path
      vote_average
    }
  }
`;

/*
==========================
    Styled Components
==========================
*/
const Container = styled.div``;
const SliderTitle = styled.h2``;

/*
==========================
    React Element
==========================
*/
const Home = (): ReactElement => {
  const { loading, error, data } = useQuery(HOME_QUERY);
  if (loading) {
    return <Loading />;
  } else {
    if (error) {
      return <Error />;
    } else {
      const { popularMovies, nowPlayingMovies, upcomingMovies } = data;
      return (
        <Container>
          <SliderTitle>인기 영화</SliderTitle>
          <MovieSlider movies={popularMovies} />
          <SliderTitle>현재 상영작</SliderTitle>
        </Container>
      );
    }
  }
};

export default Home;
