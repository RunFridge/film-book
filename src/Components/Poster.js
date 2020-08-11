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

const Sub = styled.span`
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
  character,
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
          {releaseDate && <Sub>{releaseDate}</Sub>}
          {character && <Sub>{character}</Sub>}
          {isPerson
            ? null
            : voteAverage && ( // 사람 포스터는 평점이 없음
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
  voteAverage: PropTypes.number,
  posterImage: PropTypes.string.isRequired,
  character: PropTypes.string,
  releaseDate: PropTypes.string,
  isMovie: PropTypes.bool,
  isPerson: PropTypes.bool,
};

export default Poster;
