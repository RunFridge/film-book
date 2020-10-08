import React, { ReactElement } from "react";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";

// Components
import Loading from "../Components/Loading";
import Error from "../Components/Error";
import Slider from "../Components/Slider";

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
    React Element
==========================
*/
const Home = (): ReactElement => {
  const { loading, error, data } = useQuery(HOME_QUERY);
  if (loading) {
    return <Loading />;
  } else {
    if (error) {
      return <Error message={error.message} />;
    } else {
      const { popularMovies, nowPlayingMovies, upcomingMovies } = data;
      return (
        <>
          <Slider movies={popularMovies} sliderTitle="인기 영화" />
          <Slider movies={nowPlayingMovies} sliderTitle="현재 상영 영화" />
          <Slider movies={upcomingMovies} sliderTitle="개봉 예정 영화" />
        </>
      );
    }
  }
};

export default Home;
