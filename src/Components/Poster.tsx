import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Utils
import { constructImageUri, posterSizes } from "../Utils";

// File import
import noPosterImg from "../Assets/noPosterSmall.png";

// Type
import { Theme } from "../@types/style";

/*
==========================
    Styled Components
==========================
*/
const KeenSliderContainer = styled.div`
  /* Size */
  height: 100%;

  /* Display */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledLink = styled(Link)`
  /* Link Style */
  text-decoration: none;
  color: inherit;
  &::visited {
    color: inherit;
  }
`;

const PosterImage = styled.img`
  /* Size */
  width: 350px;

  /* Box Style */
  border-radius: 1em;
`;

const Contents = styled.div`
  /* Font Style */
  font-size: 1em;
`;

const Title = styled.h3``;

const ReleaseDate = styled.p`
  /* Font style */
  opacity: 0.8;
  font-size: 0.8em;
`;

const Rating = styled.p`
  /* Font Style */
  color: ${({ theme }: { theme: Theme }): string => theme.primary};
  /* Rating star */
  &::before {
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    content: "\f005";
    margin-right: 5px;
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
  releaseDate,
  rating,
  posterSrc,
  isMovie,
}: {
  id: number;
  title: string;
  releaseDate: string;
  rating: number;
  posterSrc: string | null;
  isMovie: boolean;
}): ReactElement => {
  if (title.length > 18) {
    title = title.slice(0, 15) + "...";
  }
  return (
    <KeenSliderContainer className="keen-slider__slide">
      <StyledLink to={isMovie ? `/movie/${id}` : `/show/${id}`}>
        <PosterImage
          src={
            posterSrc
              ? constructImageUri(posterSrc, posterSizes.w500)
              : noPosterImg
          }
        />
        <Contents>
          <Title>{title}</Title>
          <ReleaseDate>{releaseDate}</ReleaseDate>
          <Rating>{rating ? `${rating} / 10` : "No rating"}</Rating>
        </Contents>
      </StyledLink>
    </KeenSliderContainer>
  );
};

export default Poster;
