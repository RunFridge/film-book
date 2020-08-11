import React from "react";
import styled from "styled-components";
import SliderWrapper from "../Components/Slider/SliderWrapper";
import { tmdbTVApi } from "../api";

const ContentTitle = styled.h1`
  margin: 30px 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.inputBackdrop};
  user-select: none;
`;

const Shows = () => {
  return (
    <>
      <ContentTitle>인기 상영작</ContentTitle>
      <SliderWrapper api={tmdbTVApi.popular} />
      <ContentTitle>높은 평점작</ContentTitle>
      <SliderWrapper api={tmdbTVApi.topRated} />
      <ContentTitle>현재 상영작</ContentTitle>
      <SliderWrapper api={tmdbTVApi.airingToday} />
    </>
  );
};

export default Shows;
