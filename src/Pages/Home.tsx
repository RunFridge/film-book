import React, { ReactElement } from "react";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";

// Components
import Loading from "../Components/Loading";
import Error from "../Components/Error";
import { MovieSlider } from "../Components/Slider";

// Types
import { Theme } from "../@types/style";

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
      release_date
    }
    nowPlayingMovies {
      id
      title
      poster_path
      vote_average
      release_date
    }
    upcomingMovies {
      id
      title
      poster_path
      vote_average
      release_date
    }
  }
`;

/*
==========================
    Styled Components
==========================
*/
const Container = styled.div`
  /* Style */
  background: ${({ theme }: { theme: Theme }) => theme.bgPrimary};
  color: ${({ theme }: { theme: Theme }) => theme.enabled};

  /* Size */
  padding-bottom: 80px;
`;

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
          <MovieSlider movies={popularMovies} sliderTitle="인기 영화" />
          <MovieSlider movies={nowPlayingMovies} sliderTitle="현재 상영 영화" />
          <MovieSlider movies={upcomingMovies} sliderTitle="개봉 예정 영화" />
        </Container>
      );
    }
  }
};

export default Home;
