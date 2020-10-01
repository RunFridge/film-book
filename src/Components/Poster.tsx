import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { device } from "../Styles/Responsive";

// Utils
import { constructImageUri, posterSizes } from "../Utils";

// Type
import { Theme } from "../@types/style";
import { NoUnusedFragmentsRule } from "graphql";

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

  /* Hover */
  &:hover > img {
    filter: drop-shadow(
      2px 2px 10px ${({ theme }: { theme: Theme }): string => theme.textShadow}
    );
  }
`;

const PosterImage = styled.img`
  /* Size */
  width: 180px;

  /* Box Style */
  border-radius: 1em;

  /* Responsive */
  ${device.desktop} {
    width: 250px;
  }
  ${device.tablet} {
    width: 200px;
  }
`;

const Contents = styled.div`
  /* Font Style */
  font-size: 0.7em;

  /* Responsive */
  ${device.desktop} {
    font-size: 1em;
  }
  ${device.tablet} {
    font-size: 0.8em;
  }
`;

const Title = styled.h3`
  /* Size */
  margin-bottom: 0.25em;
`;

const ReleaseDate = styled.p`
  /* Size */
  margin-bottom: 0.25em;

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
  name,
  releaseDate,
  firstAirDate,
  rating,
  posterSrc,
  isMovie = false,
}: {
  id: number;
  title?: string;
  name?: string;
  releaseDate?: string;
  firstAirDate?: string;
  rating: number;
  posterSrc: string | null;
  isMovie?: boolean;
}): ReactElement => {
  // Shorten name/title of the movie or show
  if (title && title.length > 18) {
    title = title.slice(0, 15) + "...";
  } else if (name && name.length > 18) {
    name = name.slice(0, 15) + "...";
  }

  // React Element
  return (
    <KeenSliderContainer className="keen-slider__slide">
      <StyledLink to={isMovie ? `/movie/${id}` : `/show/${id}`}>
        <PosterImage
          src={
            posterSrc
              ? constructImageUri(posterSrc, posterSizes.w500)
              : require("../Assets/noPosterSmall.png")
          }
        />
        <Contents>
          <Title>{isMovie ? title : name}</Title>
          <ReleaseDate>{isMovie ? releaseDate : firstAirDate}</ReleaseDate>
          <Rating>{rating ? `${rating} / 10` : "No rating"}</Rating>
        </Contents>
      </StyledLink>
    </KeenSliderContainer>
  );
};

export default Poster;
