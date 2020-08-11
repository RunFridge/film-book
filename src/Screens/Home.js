import React from "react";
import styled from "styled-components";
import SliderWrapper from "../Components/Slider/SliderWrapper";
import { tmdbMoviesApi } from "../api";

const ContentTitle = styled.h1`
  margin: 30px 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.inputBackdrop};
  user-select: none;
`;

const Home = () => {
  return (
    <>
      <ContentTitle>인기 상영작</ContentTitle>
      <SliderWrapper api={tmdbMoviesApi.popular} isMovie />
      <ContentTitle>현재 상영작</ContentTitle>
      <SliderWrapper api={tmdbMoviesApi.nowPlaying} isMovie />
      <ContentTitle>상영 예정작</ContentTitle>
      <SliderWrapper api={tmdbMoviesApi.upcoming} isMovie />
    </>
  );
};

export default Home;
