import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import vars from "../Style/vars";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  &:visited {
    color: inherit;
  }
  &:hover {
    text-decoration: none;
    color: inherit;
  }
`;

const PosterWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  animation: fadeIn ease 0.5s;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 20px;
  box-shadow: ${vars.coolBoxShadow};
`;

const InfoContainer = styled.div`
  & > :not(:last-child) {
    margin-bottom: 5px;
  }
`;

const Title = styled.span`
  display: block;
  white-space: nowrap;
`;

const Date = styled.span`
  display: block;
  font-size: 0.6rem;
  color: ${(props) => props.theme.colors.subText};
`;

const Score = styled.span`
  font-size: 0.8rem;
  font-weight: bold;
  color: ${(props) => props.theme.colors.secondary};

  span {
    margin: 0 5px;
  }
`;

const Poster = ({
  id,
  title,
  voteAverage,
  posterImage,
  releaseDate,
  isMovie = false,
  isPerson = false,
}) => {
  return (
    <StyledLink
      to={isMovie ? `/movie/${id}` : isPerson ? `/person/${id}` : `/show/${id}`}
    >
      <PosterWrapper>
        <Image src={posterImage} />
        <InfoContainer>
          <Title>{title}</Title>
          <Date>{releaseDate}</Date>
          {isPerson ? null : (
            <Score>
              평점
              <span role="img" aria-label="Star">
                ★
              </span>
              {voteAverage} / 10
            </Score>
          )}
        </InfoContainer>
      </PosterWrapper>
    </StyledLink>
  );
};

Poster.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  voteAverage: PropTypes.number.isRequired,
  posterImage: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  isMovie: PropTypes.bool,
  isPerson: PropTypes.bool,
};

export default Poster;
