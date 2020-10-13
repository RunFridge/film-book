import React, { ReactElement } from "react";
import { Helmet } from "react-helmet";
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
const SHOWS_QUERY = gql`
  query {
    popularShows {
      id
      name
      poster_path
      vote_average
      first_air_date
    }
    airingTodayShows {
      id
      name
      poster_path
      vote_average
      first_air_date
    }
    topRatedShows {
      id
      name
      poster_path
      vote_average
      first_air_date
    }
  }
`;

/*
==========================
    React Element
==========================
*/
const Shows = (): ReactElement => {
  const { loading, error, data } = useQuery(SHOWS_QUERY);
  if (loading) {
    return <Loading />;
  } else {
    if (error) {
      return <Error message={error.message} />;
    } else {
      const { popularShows, airingTodayShows, topRatedShows } = data;
      return (
        <>
          <Helmet>
            <title>Film Book 2.0 | Shows</title>
          </Helmet>
          <Slider shows={popularShows} sliderTitle="인기 프로그램" />
          <Slider shows={airingTodayShows} sliderTitle="실시간 프로그램" />
          <Slider shows={topRatedShows} sliderTitle="최고 평점 프로그램" />
        </>
      );
    }
  }
};

export default Shows;
