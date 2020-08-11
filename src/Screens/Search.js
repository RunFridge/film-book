import React, { useContext } from "react";
import styled from "styled-components";
import Error from "../Components/Error";
import { Helmet } from "react-helmet";
import SliderWrapper from "../Components/Slider/SliderWrapper";
import { SearchContext } from "../Components/SearchProvider";
import { tmdbMoviesApi, tmdbTVApi, tmdbPeopleApi } from "../api";
import { withRouter } from "react-router-dom";

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

const Search = () => {
  const { term } = useContext(SearchContext);

  return (
    <div>
      <Helmet>
        <title>Film Book | {term}</title>
      </Helmet>
      {term ? (
        <SearchWrapper>
          <ContentTitle>'{term}'에 대한 검색결과</ContentTitle>
          <ContentTitle>영화</ContentTitle>
          <SliderWrapper api={tmdbMoviesApi.search} param={term} isMovie />
          <ContentTitle>TV 프로그램</ContentTitle>
          <SliderWrapper api={tmdbTVApi.search} param={term} />
          <ContentTitle>인물</ContentTitle>
          <SliderWrapper api={tmdbPeopleApi.search} param={term} isPerson />
        </SearchWrapper>
      ) : (
        <Error />
      )}{" "}
    </div>
  );
};

export default withRouter(Search);
