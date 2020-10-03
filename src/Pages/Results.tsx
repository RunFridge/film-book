import React, { ReactElement } from "react";
import styled from "styled-components";
import { withRouter, useLocation } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

// Components
import Page404 from "./Page404";
import Loading from "../Components/Loading";
import Error from "../Components/Error";
import Slider from "../Components/Slider";

/*
==========================
    GraphQL query
==========================
*/
const SEARCH_QUERY = gql`
  query searchByTerm($term: String!) {
    searchMovie(term: $term) {
      id
      title
      poster_path
      release_date
    }
    searchShow(term: $term) {
      id
      name
      poster_path
      first_air_date
    }
    searchPerson(term: $term) {
      id
      name
      profile_path
    }
  }
`;

/*
==========================
    Styled Component
==========================
*/
const Info = styled.h3`
  /* Size */
  padding: 30px;
`;

/*
==========================
    React Component
==========================
*/
const Results = withRouter(
  (): ReactElement => {
    const { state }: { state: { term?: string } } = useLocation();

    if (state && state.term) {
      const { loading, error, data } = useQuery(SEARCH_QUERY, {
        variables: { term: state.term },
      });

      if (loading) {
        return <Loading />;
      } else {
        if (error) {
          return <Error message={error.message} />;
        } else {
          const { searchMovie, searchShow, searchPerson } = data;
          return (
            <>
              <Slider movies={searchMovie} sliderTitle="영화 검색 결과" />
              {searchMovie.length === 0 ? (
                <Info>😥 검색 결과가 없습니다.</Info>
              ) : null}
              <Slider shows={searchShow} sliderTitle="프로그램 검색 결과" />
              {searchShow.length === 0 ? (
                <Info>😥 검색 결과가 없습니다.</Info>
              ) : null}
              <Slider people={searchPerson} sliderTitle="인물 검색 결과" />
              {searchPerson.length === 0 ? (
                <Info>😥 검색 결과가 없습니다.</Info>
              ) : null}
            </>
          );
        }
      }
    } else {
      return <Page404 />;
    }
  }
);

export default Results;
