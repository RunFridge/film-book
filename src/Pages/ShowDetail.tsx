import React, { ReactElement } from "react";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import { Link, useRouteMatch, withRouter } from "react-router-dom";
import { device } from "../Styles/Responsive";

// Utils
import { constructImageUri, backdropSizes, posterSizes } from "../Utils";

// Components
import Loading from "../Components/Loading";
import Error from "../Components/Error";
import SeasonThumbnail from "../Components/SeasonThumbnail";
import Thumbnail from "../Components/Thumbnail";
import Slider from "../Components/Slider";
import Page404 from "./Page404";

// Types
import { Theme } from "../@types/style";
import { Show } from "../@types/graphqlTypes";

/*
==========================
    GraphQL query
==========================
*/
const SHOW_DETAIL_QUERY = gql`
  query getShowDetailById($id: Int!) {
    showDetail(id: $id) {
      id
      poster_path
      backdrop_path
      first_air_date
      last_air_date
      homepage
      name
      number_of_seasons
      number_of_episodes
      overview
      seasons {
        id
        season_number
        air_date
        name
        poster_path
      }
      vote_average
      videos {
        results {
          name
          site
          key
        }
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
    similarShows(id: $id) {
      id
      poster_path
      name
      first_air_date
      vote_average
    }
  }
`;

/*
==========================
    Styled Components
==========================
*/

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

const StyledAnchor = styled.a`
  /* Link style */
  text-decoration: underline;
  color: inherit;
  &:visited {
    color: inherit;
  }
  outline: 0;
`;

const StyledLink = styled(Link)`
  /* Link style */
  text-decoration: underline;
  color: inherit;
  &:visited {
    color: inherit;
  }
  outline: 0;
`;

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

const Overview = styled.p`
  /* Size */
  padding: 15px 0;

  /* Font Style */
  font-size: 1.25em;
  line-height: 1.5em;
`;

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

const ThumbnailsContainer = styled.div`
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
  margin: 15px 0;
`;

/*
==========================
    React Element
==========================
*/
const ShowDetail = withRouter(
  (): ReactElement => {
    const {
      params: { id },
    }: { params: { id: string } } = useRouteMatch();

    const { loading, error, data } = useQuery(SHOW_DETAIL_QUERY, {
      variables: { id: parseInt(id) },
      notifyOnNetworkStatusChange: true,
    });

    if (loading) {
      return <Loading />;
    } else if (error) {
      return <Error message={error.message} />;
    } else {
      const {
        showDetail,
        similarShows,
      }: { showDetail: Show; similarShows: [Show] } = data;

      if (!showDetail) {
        // Show ID DNE
        return <Page404 />;
      }

      const {
        credits: { cast, crew },
        videos: { results: videos },
        seasons,
      } = showDetail;

      return (
        <>
          {/* Backdrop Render */}
          {showDetail.backdrop_path && (
            <Backdrop
              bgImage={constructImageUri(
                showDetail.backdrop_path,
                posterSizes.original
              )}
            />
          )}
          {/* Render Contents */}
          <Contents>
            <CoverContainer>
              <Cover
                src={
                  showDetail.poster_path
                    ? constructImageUri(
                        showDetail.poster_path,
                        posterSizes.w500
                      )
                    : require("../Assets/noPosterSmall.png")
                }
              />
            </CoverContainer>
            <TextContainer>
              <Title>{showDetail.name}</Title>
              <InfoContainer>
                <Info>
                  {showDetail.first_air_date && (
                    <InfoItem>첫 방영일: {showDetail.first_air_date}</InfoItem>
                  )}
                  {showDetail.last_air_date && (
                    <InfoItem>
                      마지막 방영일: {showDetail.last_air_date}
                    </InfoItem>
                  )}
                </Info>
                <Info>
                  {showDetail.genres.map((genre, idx) => (
                    <InfoItem key={idx}>{genre.name}</InfoItem>
                  ))}
                </Info>
              </InfoContainer>
              <InfoContainer>
                <Info>
                  {showDetail.number_of_seasons && (
                    <InfoItem>{showDetail.number_of_seasons} 시즌</InfoItem>
                  )}
                  {showDetail.number_of_episodes && (
                    <InfoItem>
                      {showDetail.number_of_episodes} 에피소드
                    </InfoItem>
                  )}
                </Info>
                <Info>
                  {showDetail.homepage && (
                    <InfoItem>
                      <StyledAnchor href={showDetail.homepage} target="_blank">
                        {showDetail.homepage}
                      </StyledAnchor>
                    </InfoItem>
                  )}
                </Info>
              </InfoContainer>
              {/* Poster download for mobile */}
              {showDetail.poster_path && (
                <MobilePosterViewer>
                  <h3>포스터 다운로드:</h3>
                  <MobilePosterLink
                    href={constructImageUri(
                      showDetail.poster_path,
                      posterSizes.w500
                    )}
                    target="_blank"
                  >
                    W500
                  </MobilePosterLink>
                  <MobilePosterLink
                    href={constructImageUri(
                      showDetail.poster_path,
                      posterSizes.w780
                    )}
                    target="_blank"
                  >
                    W780
                  </MobilePosterLink>
                  <MobilePosterLink
                    href={constructImageUri(
                      showDetail.poster_path,
                      posterSizes.original
                    )}
                    target="_blank"
                  >
                    Original
                  </MobilePosterLink>
                </MobilePosterViewer>
              )}
              {/* Rating */}
              {showDetail.vote_average && (
                <Rating>
                  <i className="fas fa-star" />
                  평점: {showDetail.vote_average} / 10
                </Rating>
              )}
              {/* Show overview */}
              {showDetail.overview && (
                <Overview>{showDetail.overview}</Overview>
              )}
              {/* Trailer thumbnails */}
              {videos && videos.length > 0 && (
                <>
                  <ContainerTitle>관련 영상</ContainerTitle>
                  <ThumbnailsContainer>
                    {videos.map((video, idx) =>
                      video.site === "YouTube" ? (
                        <Thumbnail key={idx} video={video} />
                      ) : null
                    )}
                  </ThumbnailsContainer>
                </>
              )}
              {/* Season Detail */}
              {seasons && (
                <>
                  <ContainerTitle>시즌 정보</ContainerTitle>
                  <ThumbnailsContainer>
                    {seasons.map((season, idx) => (
                      <SeasonThumbnail key={idx} showId={id} season={season} />
                    ))}
                  </ThumbnailsContainer>
                </>
              )}
            </TextContainer>
          </Contents>
          {/* ====== Sliders ====== */}
          {cast.length > 0 && <Slider people={cast} sliderTitle="캐스트" />}
          {crew.length > 0 && <Slider people={crew} sliderTitle="크루" />}
          {similarShows.length > 0 && (
            <Slider shows={similarShows} sliderTitle="관련 프로그램" />
          )}
        </>
      );
    }
  }
);

export default ShowDetail;
