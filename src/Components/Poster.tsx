import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Utils
import { constructImageUri, posterSizes } from "../Utils";

// File import
import noPosterImg from "../Assets/noPosterSmall.png";

/*
==========================
    Styled Components
==========================
*/
const StyledLink = styled(Link)`
  /* Link Style */
  text-decoration: none;
  color: inherit;
  &::visited {
    color: inherit;
  }
`;

const Container = styled.div``;

const PosterImage = styled.img`
  /* Size */
  width: 250px;

  /* Box Style */
  border-radius: 2em;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
`;

const Contents = styled.div`
  /* Display */

  /* Size */
  height: 3em;

  /* Font Style */
  font-size: 0.8em;
`;
const Title = styled.h3``;
const Rating = styled.p`
  /* Font Style */
  /* Rating star */
  &::before {
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    content: "\f005";
  }
`;

/*
==========================
    React Element
==========================
*/
const Poster = ({
  id,
  title,
  rating,
  posterSrc,
  isMovie,
}: {
  id: number;
  title: string;
  rating: number;
  posterSrc: string | null;
  isMovie: boolean;
}): ReactElement => (
  <StyledLink to={isMovie ? `/movie/${id}` : `/show/${id}`}>
    <Container>
      <PosterImage
        src={
          posterSrc
            ? constructImageUri(posterSrc, posterSizes.w500)
            : noPosterImg
        }
      />
      <Contents>
        <Title>{title}</Title>
        <Rating>{rating}</Rating>
      </Contents>
    </Container>
  </StyledLink>
);

export default Poster;
