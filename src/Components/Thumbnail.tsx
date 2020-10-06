import React, { ReactElement } from "react";
import styled from "styled-components";

// Utils
import {
  constructYTThumbnail,
  constructYTUrl,
  shortenLongText,
} from "../Utils";

// Types
import { Theme } from "../@types/style";
import { Video } from "../@types/graphqlTypes";

/*
==========================
    Styled Components
==========================
*/
const StyledAnchor = styled.a`
  /* Link Style */
  text-decoration: none;
  color: inherit;
  &:visited {
    color: inherit;
  }
  outline: 0;
`;

const ThumbnailImg = styled.img`
  max-width: 100%;
`;

const Title = styled.h3`
  /* Font Style */
  font-size: 1em;

  /* FA Icon */
  &::before {
    font-family: "Font Awesome 5 Brands";
    content: "\f167";
    margin: 5px;
  }
`;

/*
==========================
    React Element
==========================
*/
const Thumbnail = ({ video }: { video: Video }): ReactElement => {
  const { name, key } = video;
  const shortenedName = shortenLongText(10, name);

  return (
    <StyledAnchor href={constructYTUrl(key)} target="_blank">
      <ThumbnailImg src={constructYTThumbnail(key)} />
      <Title title={name}>{shortenedName}</Title>
    </StyledAnchor>
  );
};

export default Thumbnail;
