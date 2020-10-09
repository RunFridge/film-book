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
import Thumbnail from "../Components/Thumbnail";
import Page404 from "./Page404";

// Type
import { Theme } from "../@types/style";
import { Movie } from "../@types/graphqlTypes";

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

const CoverContainer = styled.div`
  /* Display */
  display: none;

  /* Size */
  padding: 0 30px;

  /* Transition */
  transition: 0.25s ease-out;
  /* Responsive */
  ${device.desktop} {
    display: block;
  }
`;

const Cover = styled.img`
  /* Border */
  border-radius: 2em;

  /* Transition */
  transition: all 250ms ease-out;
`;

const TextContainer = styled.div`
  /* Size */
  padding: 0 30px;
  width: 100%;
`;

const Title = styled.h1`
  /* Border */
  border-bottom: 1px solid;

  /* Font Style */
  font-size: 2.8em;
  font-weight: 700;
  border-bottom: 0.5px solid ${({ theme }: { theme: Theme }) => theme.disabled};
  text-shadow: 2px 4px 3px ${({ theme }: { theme: Theme }) => theme.textShadow};
`;

const InfoContainer = styled.div`
  /* Flexbox */
  display: flex;
  justify-content: space-between;
  align-items: center;

  /* Size */
  width: 100%;
`;

const MobilePosterViewer = styled.div`
  /* Flexbox */
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${device.desktop} {
    display: none;
  }
`;

const MobilePosterLink = styled.a`
  /* Link Style */
  text-decoration: underline;
  color: inherit;
  &:visited {
    color: inherit;
  }
  outline: 0;

  /* Button Style */
  border: 1px solid transparent;
  border-radius: 2em;
`;

const Info = styled.ul`
  /* Flexbox */
  display: flex;
  align-items: center;

  /* Size */
  padding: 0;
  padding: 10px 0;

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

const Rating = styled.h2`
  /* Flexbox */
  display: flex;
  align-items: center;

  /* Font Style */
  color: ${({ theme }: { theme: Theme }) => theme.primary};

  /* Size */
  padding: 15px 0;
  & > i {
    margin-right: 5px;
  }
`;

const Overview = styled.p`
  /* Size */
  padding: 15px 0;

  /* Font Style */
  font-size: 1.25em;
  line-height: 1.5em;
`;

const VideosContainer = styled.div`
  /* Gridbox */
  display: grid;
  grid-template-columns: repeat(5, minmax(70px, 1fr));
  ${device.phone} {
    grid-template-columns: repeat(3, minmax(70px, 1fr));
  }
  grid-gap: 10px;
`;

const ContainerTitle = styled.h3`
  /* Font style */
  font-size: 1em;
  font-weight: 700;
  border-bottom: 0.5px solid ${({ theme }: { theme: Theme }) => theme.disabled};
  text-shadow: 2px 4px 3px ${({ theme }: { theme: Theme }) => theme.textShadow};

  /* Size */
  margin-bottom: 15px;
`;

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
        const {
          movieDetail,
          similarMovies,
        }: { movieDetail: Movie; similarMovies: [Movie] } = data;

        if (!movieDetail) {
          // 영화 ID 존재하지 않음
          return <Page404 />;
        }

        const {
          credits: { cast, crew },
          videos: { results: videos },
        } = movieDetail;
        // RENDER
        return (
          <>
            {/* ====== Render backdrop if exists */}
            {movieDetail.backdrop_path && (
              <Backdrop
                bgImage={constructImageUri(
                  movieDetail.backdrop_path,
                  backdropSizes.original
                )}
              />
            )}
            {/* ====== Render Contents ====== */}
            <Contents>
              {/* ====== Poster Cover ====== */}
              <CoverContainer>
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
              </CoverContainer>

              {/* ====== Text Information ====== */}
              <TextContainer>
                <Title>{movieDetail.title}</Title>
                <InfoContainer>
                  <Info>
                    <InfoItem>{movieDetail.release_date}</InfoItem>
                    <InfoItem>{movieDetail.runtime}분</InfoItem>
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
                  <Info>
                    {movieDetail.genres.map((genre, idx) => (
                      <InfoItem key={idx}>{genre.name}</InfoItem>
                    ))}
                  </Info>
                </InfoContainer>
                {/* Poster download for mobile */}
                {movieDetail.poster_path && (
                  <MobilePosterViewer>
                    <h3>포스터 다운로드:</h3>
                    <MobilePosterLink
                      href={constructImageUri(
                        movieDetail.poster_path,
                        posterSizes.w500
                      )}
                      target="_blank"
                    >
                      W500
                    </MobilePosterLink>
                    <MobilePosterLink
                      href={constructImageUri(
                        movieDetail.poster_path,
                        posterSizes.w780
                      )}
                      target="_blank"
                    >
                      W780
                    </MobilePosterLink>
                    <MobilePosterLink
                      href={constructImageUri(
                        movieDetail.poster_path,
                        posterSizes.original
                      )}
                      target="_blank"
                    >
                      Original
                    </MobilePosterLink>
                  </MobilePosterViewer>
                )}
                {/* Rating */}
                {movieDetail.vote_average && (
                  <Rating>
                    <i className="fas fa-star" />
                    평점: {movieDetail.vote_average} / 10
                  </Rating>
                )}
                {/* Movie overview */}
                {movieDetail.overview && (
                  <Overview>{movieDetail.overview}</Overview>
                )}
                {/* Trailer thumbnails */}
                {videos && videos.length > 0 && (
                  <>
                    <ContainerTitle>관련 영상</ContainerTitle>
                    <VideosContainer>
                      {videos.map((video, idx) =>
                        video.site === "YouTube" ? (
                          <Thumbnail key={idx} video={video} />
                        ) : null
                      )}
                    </VideosContainer>
                  </>
                )}
              </TextContainer>
            </Contents>
            {/* ====== Sliders ====== */}
            {cast.length > 0 && <Slider people={cast} sliderTitle="캐스트" />}
            {crew.length > 0 && <Slider people={crew} sliderTitle="크루" />}
            {similarMovies.length > 0 && (
              <Slider movies={similarMovies} sliderTitle="관련 영화" />
            )}
          </>
        );
      }
    }
  }
);

export default MovieDetail;
