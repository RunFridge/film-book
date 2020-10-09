import React, { ReactElement } from "react";
import styled from "styled-components";
import { useRouteMatch, withRouter, Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { device } from "../Styles/Responsive";

// Components
import Loading from "../Components/Loading";
import Error from "../Components/Error";

// Types
import { Season, Episode } from "../@types/graphqlTypes";
import { Theme } from "../@types/style";

// Utils
import { constructImageUri, posterSizes } from "../Utils";

/*
==========================
    GraphQL query
==========================
*/
const SEASON_DETAIL_QUERY = gql`
  query getSeasonDetail($id: Int!, $seasonNumber: Int!) {
    showDetail(id: $id) {
      name
      backdrop_path
    }
    seasonDetail(showId: $id, seasonNumber: $seasonNumber) {
      id
      air_date
      name
      poster_path
      overview
      season_number
      episodes {
        episode_number
        name
        vote_average
      }
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

const StyledLink = styled(Link)`
  /* Link style */
  text-decoration: none;
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

const EpisodesContainer = styled.div`
  /* Gridbox */
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1em;
`;

const EpisodeItem = styled.div`
  /* Size */
  padding: 2px;

  /* Border */
  border: 0.5px solid ${({ theme }: { theme: Theme }) => theme.disabled};
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
const SeasonDetail = withRouter(
  (): ReactElement => {
    const {
      params: { id, seasonNumber },
    }: { params: { id: string; seasonNumber: string } } = useRouteMatch();

    const { loading, error, data } = useQuery(SEASON_DETAIL_QUERY, {
      variables: { id: parseInt(id), seasonNumber: parseInt(seasonNumber) },
      notifyOnNetworkStatusChange: true,
    });

    if (loading) {
      return <Loading />;
    } else if (error) {
      return <Error message={error.message} />;
    } else {
      // Destruct data
      const {
        showDetail: { name: showTitle, backdrop_path },
        seasonDetail,
      }: {
        showDetail: { name: string; backdrop_path: string };
        seasonDetail: Season;
      } = data;

      const { episodes } = seasonDetail;

      return (
        <>
          {/* Backdrop Render */}
          {backdrop_path && (
            <Backdrop
              bgImage={constructImageUri(backdrop_path, posterSizes.original)}
            />
          )}
          {/* Render Contents */}
          <Contents>
            <CoverContainer>
              <Cover
                src={
                  seasonDetail.poster_path
                    ? constructImageUri(
                        seasonDetail.poster_path,
                        posterSizes.w500
                      )
                    : require("../Assets/noPosterSmall.png")
                }
              />
            </CoverContainer>
            <TextContainer>
              {/* Breadcrum */}
              <InfoContainer>
                <Info>
                  <InfoItem>
                    <StyledLink to={`/show/${id}`}>{showTitle}</StyledLink>{" "}
                    {">"} {seasonDetail.name}
                  </InfoItem>
                </Info>
              </InfoContainer>
              {/* Title */}
              <Title>
                {showTitle}:{seasonDetail.name}
              </Title>
              {/* Airdate */}
              <InfoContainer>
                <Info>
                  {seasonDetail.air_date && (
                    <InfoItem>방영일자: {seasonDetail.air_date}</InfoItem>
                  )}
                </Info>
              </InfoContainer>
              {/* Poster download for mobile */}
              {seasonDetail.poster_path && (
                <MobilePosterViewer>
                  <h3>포스터 다운로드:</h3>
                  <MobilePosterLink
                    href={constructImageUri(
                      seasonDetail.poster_path,
                      posterSizes.w500
                    )}
                    target="_blank"
                  >
                    W500
                  </MobilePosterLink>
                  <MobilePosterLink
                    href={constructImageUri(
                      seasonDetail.poster_path,
                      posterSizes.w780
                    )}
                    target="_blank"
                  >
                    W780
                  </MobilePosterLink>
                  <MobilePosterLink
                    href={constructImageUri(
                      seasonDetail.poster_path,
                      posterSizes.original
                    )}
                    target="_blank"
                  >
                    Original
                  </MobilePosterLink>
                </MobilePosterViewer>
              )}
              {/* Overview */}
              {seasonDetail.overview && (
                <Overview>{seasonDetail.overview}</Overview>
              )}
              {/* Episode Detail */}
              {episodes && (
                <>
                  <ContainerTitle>에피소드 정보</ContainerTitle>
                  <EpisodesContainer>
                    {episodes.map((ep, idx) => (
                      <StyledLink
                        key={idx}
                        to={`/show/${id}/season/${seasonNumber}/episode/${ep.episode_number}`}
                      >
                        <EpisodeItem>
                          {ep.episode_number}화 :{ep.name}
                        </EpisodeItem>
                      </StyledLink>
                    ))}
                  </EpisodesContainer>
                </>
              )}
            </TextContainer>
          </Contents>
        </>
      );
    }
  }
);

export default SeasonDetail;
