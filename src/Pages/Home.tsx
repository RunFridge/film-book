import React, { ReactElement } from "react";
import { useQuery, gql } from "@apollo/client";

// Components
import Loading from "../Components/Loading";
import Error from "../Components/Error";

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

const Home = (): ReactElement => {
  const { loading, error, data } = useQuery(HOME_QUERY);
  console.log(data);
  if (loading) {
    return <Loading />;
  } else {
    if (error) {
      return <Error />;
    } else {
      return <h1>Home</h1>;
    }
  }
};

export default Home;
