import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { device } from "../Styles/Responsive";

// Utils
import { constructImageUri, posterSizes, shortenLongText } from "../Utils";

// Type
import { Theme } from "../@types/style";

/*
==========================
    Styled Components
==========================
*/
const StyledLink = styled(Link)`
  /* Display */
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  /* Link Style */
  text-decoration: none;
  color: inherit;
  &::visited {
    color: inherit;
  }
  outline: 0;

  /* Hover */
  &:hover > img {
    filter: drop-shadow(
      2px 2px 10px ${({ theme }: { theme: Theme }): string => theme.textShadow}
    );
  }
`;

const PosterImage = styled.img`
  /* Size */
  width: 40vw;

  /* Box Style */
  border-radius: 1em;

  /* Responsive */
  ${device.desktop} {
    width: 14vw;
  }
  ${device.tablet} {
    width: 15vw;
  }
`;

const Contents = styled.div`
  /* Size */
  max-width: 40vw;

  /* Responsive */
  ${device.desktop} {
    max-width: 14vw;
  }
  ${device.tablet} {
    max-width: 15vw;
  }
`;

const Title = styled.h3`
  /* Size */
  margin-bottom: 0.25em;
`;

const SubInfo = styled.p`
  /* Size */
  margin-bottom: 0.25em;

  /* Font style */
  opacity: 0.8;
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
  isPerson = false,
  character,
  department,
}: {
  id: number;
  title?: string;
  name?: string;
  releaseDate?: string;
  firstAirDate?: string;
  rating?: number;
  posterSrc: string | null;
  isMovie?: boolean;
  isPerson?: boolean;
  character?: string;
  department?: string;
}): ReactElement => {
  // Shorten name/title of the movie or show
  let shortenTitle: string | undefined;
  if (title) {
    shortenTitle = shortenLongText(13, title);
  } else if (name && !isPerson) {
    shortenTitle = shortenLongText(13, name);
  }

  // Shorten department / character of the cast or crew
  if (character) {
    character = shortenLongText(20, character);
  } else if (department) {
    department = shortenLongText(20, department);
  }

  // Get sub information
  let subInfo: string | undefined;
  if (isPerson) {
    if (character) {
      subInfo = character;
    } else if (department) {
      subInfo = department;
    }
  } else if (isMovie) {
    subInfo = releaseDate;
  } else if (firstAirDate) {
    subInfo = firstAirDate;
  }

  // React Element
  return (
    <StyledLink
      to={isPerson ? `/person/${id}` : isMovie ? `/movie/${id}` : `/show/${id}`}
      className="keen-slider__slide"
    >
      <PosterImage
        src={
          posterSrc
            ? constructImageUri(posterSrc, posterSizes.w500)
            : require("../Assets/noPosterSmall.png")
        }
      />
      <Contents>
        <Title title={isMovie ? title : name}>
          {isPerson ? name : shortenTitle}
        </Title>
        {subInfo && <SubInfo>{subInfo}</SubInfo>}
        {isPerson ? null : (
          <Rating>{rating ? `${rating} / 10` : "No rating"}</Rating>
        )}
      </Contents>
    </StyledLink>
  );
};

export default Poster;
