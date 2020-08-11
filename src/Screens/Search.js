import React from "react";
import styled from "styled-components";
import Error from "../Components/Error";
import { Helmet } from "react-helmet";
import SliderWrapper from "../Components/Slider/SliderWrapper";
import { parseQuery } from "../Utils/utils";
import { tmdbMoviesApi, tmdbTVApi } from "../api";

const SearchWrapper = styled.div`
  height: 100%;
  padding-bottom: 20px;
`;

const ContentTitle = styled.h1`
  margin: 30px 0;
  user-select: none;
  &:not(:first-child) {
    border-bottom: 1px solid ${(props) => props.theme.colors.inputBackdrop};
    margin-top: 50px;
  }
`;

const Search = ({ location: { search } }) => {
  const query = parseQuery(search);
  return (
    <div>
      <Helmet>
        <title>Film Book | {query}</title>
      </Helmet>
      {query ? (
        <SearchWrapper>
          <ContentTitle>'{query}'에 대한 검색결과</ContentTitle>
          <ContentTitle>영화</ContentTitle>
          <SliderWrapper api={tmdbMoviesApi.search} param={query} isMovie />
          <ContentTitle>TV 프로그램</ContentTitle>
          <SliderWrapper api={tmdbTVApi.search} param={query} />
          <ContentTitle>인물</ContentTitle>
        </SearchWrapper>
      ) : (
        <Error />
      )}{" "}
    </div>
  );
};

export default Search;
