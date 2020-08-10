import React from "react";
import styled from "styled-components";
import colors from "../Style/colors";
import HomeMovies from "./HomeComponents/HomeMovies";
import { tmdbMoviesApi } from "../api";

const ContentTitle = styled.h1`
  margin: 30px 0;
  font-family: "ImcreSoojin", --apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  border-bottom: 1px solid ${colors.lightBg};
  user-select: none;
`;

const Home = () => {
  return (
    <>
      <ContentTitle>인기 상영작</ContentTitle>
      <HomeMovies api={tmdbMoviesApi.popular} />
      <ContentTitle>현재 상영작</ContentTitle>
      <HomeMovies api={tmdbMoviesApi.nowPlaying} />
      <ContentTitle>상영 예정작</ContentTitle>
      <HomeMovies api={tmdbMoviesApi.upcoming} />
    </>
  );
};

export default Home;
