import React from "react";
import { gql, useQuery } from "@apollo/client";
import GlobalStyle from "./Styles/GlobalStyle";
import { Movie } from "./@types/graphqlTypes";

const GET_POPULAR_MOVIES = gql`
  query {
    popularMovies {
      id
      title
    }
  }
`;

const App = () => {
  const { loading, error, data } = useQuery(GET_POPULAR_MOVIES);
  return (
    <>
      <GlobalStyle />
      {loading ? (
        <h1>Loading</h1>
      ) : (
        data.popularMovies.map((m: Movie) => <h1 key={m.id}>{m.title}</h1>)
      )}
    </>
  );
};

export default App;
