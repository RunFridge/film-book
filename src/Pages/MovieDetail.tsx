import React, { ReactElement } from "react";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import { useRouteMatch, withRouter } from "react-router-dom";
import { device } from "../Styles/Responsive";

// Utils
import { constructImageUri, backdropSizes, posterSizes } from "../Utils";

// Components
import Loading from "../Components/Loading";
import Error from "../Components/Error";
import Slider from "../Components/Slider";

// Type
import { Theme } from "../@types/style";

/*
==========================
    GraphQL query
==========================
*/
const MOVIE_DETAIL_QUERY = gql`
  query getMovieDetailById($id: Int!) {
    movieDetail(id: $id) {
      id
      imdb_id
      poster_path
      backdrop_path
      title
      overview
      runtime
      release_date
      vote_average
      videos {
        results {
          type
          name
          site
          key
        }
      }
      production_companies {
        id
        name
        logo_path
        origin_country
      }
      genres {
        name
      }
      credits {
        cast {
          id
          name
          character
          profile_path
        }
        crew {
          id
          name
          department
          profile_path
        }
      }
    }
    similarMovies(id: $id) {
      id
      poster_path
      title
      release_date
      vote_average
    }
  }
`;

/*
==========================
    Styled Components
==========================
*/
const Backdrop = styled.div<{ bgImage: string }>`
  /* Position */
  position: fixed;
  top: 60px;
  left: 0;

  /* Size */
  width: 100%;
  height: 100%;

  /* Background */
  background-image: url(${({ bgImage }) => bgImage});
  background-position: center center;
  background-size: cover;

  /* Misc */
  filter: blur(5px);
  opacity: 0.3;
  z-index: -10;
`;

const Contents = styled.div`
  /* Flexbox */
  display: flex;

  /* Size */
  margin: 15px 0;
`;
const Cover = styled.img`
  /* Display */
  display: none;

  /* Size */
  padding: 0 30px;
  width: 70vw;

  /* Responsive */
  ${device.desktop} {
    display: block;
  }
`;

const TextContainer = styled.div`
  /* Size */
  padding: 0 30px;
`;
const Title = styled.h1`
  /* Border */
  border-bottom: 1px solid;

  /* Font Style */
  font-size: 2.5em;
  font-weight: 700;
  border-bottom: 0.5px solid ${({ theme }: { theme: Theme }) => theme.disabled};
  text-shadow: 2px 4px 3px ${({ theme }: { theme: Theme }) => theme.textShadow};
`;
const Info = styled.ul`
  /* Flexbox */
  display: flex;
  align-items: center;

  /* Size */
  padding: 0;
  margin: 10px 0;

  /* Style */
  list-style-type: none;
  font-size: 0.8em;

  /* Child Style */
  & > :not(:last-child) {
    margin-right: 5px;
    ::after {
      content: "·";
      margin-left: 5px;
    }
  }
`;
const InfoItem = styled.li``;
const Overview = styled.p``;

/*
==========================
    React Element
==========================
*/
const MovieDetail = withRouter(
  (): ReactElement => {
    const {
      params: { id },
    }: { params: { id: string } } = useRouteMatch();

    const { loading, error, data, refetch } = useQuery(MOVIE_DETAIL_QUERY, {
      variables: { id: parseInt(id) },
      notifyOnNetworkStatusChange: true,
    });

    if (loading) {
      return <Loading />;
    } else {
      if (error) {
        return <Error message={error.message} />;
      } else {
        const { movieDetail, similarMovies } = data;
        const {
          credits: { cast, crew },
        } = movieDetail;
        return (
          <>
            {/* Render backdrop if exists */}
            {movieDetail.backdrop_path && (
              <Backdrop
                bgImage={constructImageUri(
                  movieDetail.backdrop_path,
                  backdropSizes.original
                )}
              />
            )}

            <Contents>
              <Cover
                src={
                  movieDetail.poster_path
                    ? constructImageUri(
                        movieDetail.poster_path,
                        posterSizes.w500
                      )
                    : require("../Assets/noPosterSmall.png")
                }
              />
              <TextContainer>
                <Title>{movieDetail.title}</Title>
                <Info>
                  <InfoItem>{movieDetail.release_date}</InfoItem>
                  <InfoItem>{movieDetail.runtime} min</InfoItem>
                  {movieDetail.imdb_id && (
                    <a
                      href={`https://www.imdb.com/title/${movieDetail.imdb_id}/`}
                      target="_blank"
                    >
                      <img
                        src={require("../Assets/imdbLogo.svg")}
                        alt="IMDB Link"
                        width="40px"
                      />
                    </a>
                  )}
                </Info>
                <Overview>{movieDetail.overview}</Overview>
              </TextContainer>
            </Contents>
            {cast.length !== 0 && <Slider people={cast} sliderTitle="캐스트" />}
            {crew.length !== 0 && <Slider people={crew} sliderTitle="크루" />}
            {similarMovies.length !== 0 && (
              <Slider movies={similarMovies} sliderTitle="관련 영화" />
            )}
          </>
        );
      }
    }
  }
);

export default MovieDetail;
