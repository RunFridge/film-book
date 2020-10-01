import React, { ReactElement } from "react";
import styled from "styled-components";

// Components
import Poster from "./Poster";

// Types
import { Movie } from "../@types/graphqlTypes";

/*
==========================
    Styled Components
==========================
*/
const Container = styled.div`
  /* Display */
  display: flex;
`;

/*
==========================
    React Element
==========================
*/
export const MovieSlider = ({ movies }: { movies: [Movie] }): ReactElement => {
  return (
    <Container>
      {movies.map(
        ({ id, title, vote_average, poster_path }): ReactElement => (
          <Poster
            key={id}
            id={id}
            title={title}
            rating={vote_average}
            posterSrc={poster_path}
            isMovie
          />
        )
      )}
    </Container>
  );
};
