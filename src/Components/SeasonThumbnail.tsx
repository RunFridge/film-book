import React, { ReactElement } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Utils
import { constructImageUri, posterSizes } from "../Utils";

// Types
import { Theme } from "../@types/style";
import { Season } from "../@types/graphqlTypes";

/*
==========================
    Styled Components
==========================
*/
const StyledLink = styled(Link)`
  /* Flexbox */
  display: flex;
  justify-content: center;

  /* Link style */
  text-decoration: none;
  color: inherit;
  &:visited {
    color: inherit;
  }
  outline: 0;

  /* Position */
  position: relative;

  /* Hover */
  &:hover {
    div {
      opacity: 1;
    }
  }
`;

const Poster = styled.img`
  width: 100%;
  border-radius: 1em;
`;

const TextContainer = styled.div`
  /* Position */
  position: absolute;
  top: 0;
  left: 0;

  /* Opacity */
  opacity: 0;

  /* Background */
  background: rgba(0, 0, 0, 0.8);
  border-radius: 1em;

  /* Size */
  width: 100%;
  height: 100%;

  /* Flexbox */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h3`
  /* Font Style */
  color: #fff;
  text-shadow: ${({ theme }: { theme: Theme }) => theme.textShadow};
`;
const SubInfo = styled.p`
  /* Font Style */
  color: ${({ theme }: { theme: Theme }) => theme.disabled};
`;

/*
==========================
    React Element
==========================
*/
const SeasonThumbnail = ({
  showId,
  season,
}: {
  showId: string;
  season: Season;
}): ReactElement => {
  const { season_number, air_date, name, poster_path } = season;
  return (
    <StyledLink to={`/show/${showId}/season/${season_number}`}>
      <Poster
        src={
          poster_path
            ? constructImageUri(poster_path, posterSizes.w185)
            : require("../Assets/noPosterSmall.png")
        }
      />
      <TextContainer>
        <Title>{name}</Title>
        <SubInfo>{air_date}</SubInfo>
      </TextContainer>
    </StyledLink>
  );
};

export default SeasonThumbnail;
