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

const PosterWrapper = styled.div``;

const Image = styled.div`
  background-image: url(${(props) => props.source});
  height: 300px;
  background-size: cover;
  border-radius: 5px;
  margin-bottom: 15px;
  box-shadow: ${vars.coolBoxShadow};
`;

const Title = styled.span`
  display: block;
  margin-bottom: 2px;
`;

const Date = styled.span`
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.4);
`;

const Poster = ({
  id,
  title,
  voteAverage,
  posterImage,
  releaseDate,
  isMovie = false,
}) => {
  return (
    <StyledLink to={isMovie ? `/movie/${id}` : `/show/${id}`}>
      <PosterWrapper>
        <Image source={posterImage} />
        <Title>{title}</Title>
        <Date>{releaseDate.split("-")[0]}</Date>
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
};

export default Poster;
