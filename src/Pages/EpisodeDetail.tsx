import React, { ReactElement } from "react";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import { device } from "../Styles/Responsive";
import { useRouteMatch, withRouter, Link } from "react-router-dom";

// Components
import Loading from "../Components/Loading";
import Error from "../Components/Error";

// Types
import { Episode } from "../@types/graphqlTypes";
import { Theme } from "../@types/style";

// Utils
import { constructImageUri, posterSizes } from "../Utils";

/*
==========================
    GraphQL query
==========================
*/
const EPISODE_DETAIL_QUERY = gql`
  query getEpisodeDetail(
    $showId: Int!
    $seasonNumber: Int!
    $episodeNumber: Int!
  ) {
    showDetail(id: $showId) {
      id
      name
      backdrop_path
    }
    seasonDetail(showId: $showId, seasonNumber: $seasonNumber) {
      id
      name
      season_number
      poster_path
    }
    episodeDetail(
      showId: $showId
      seasonNumber: $seasonNumber
      episodeNumber: $episodeNumber
    ) {
      id
      name
      episode_number
      overview
      air_date
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
const EpisodeDetail = withRouter(
  (): ReactElement => {
    const {
      params: { id: showId, seasonNumber, episodeNumber },
    }: {
      params: { id: string; seasonNumber: string; episodeNumber: string };
    } = useRouteMatch();

    const { loading, error, data } = useQuery(EPISODE_DETAIL_QUERY, {
      variables: {
        showId: parseInt(showId),
        seasonNumber: parseInt(seasonNumber),
        episodeNumber: parseInt(episodeNumber),
      },
      notifyOnNetworkStatusChange: true,
    });

    console.log(loading, error, data);
    if (loading) {
      return <Loading />;
    } else if (error) {
      return <Error message={error.message} />;
    } else {
      // Destruct data
      const {
        showDetail: { backdrop_path, name: showTitle },
        seasonDetail: { poster_path, name: seasonName },
        episodeDetail,
      }: {
        showDetail: { backdrop_path: string; name: string };
        seasonDetail: { poster_path: string; name: string };
        episodeDetail: Episode;
      } = data;

      return (
        <>
          {/* Backdrop Render */}
          {backdrop_path && (
            <Backdrop
              bgImage={constructImageUri(backdrop_path, posterSizes.original)}
            />
          )}
          <Contents>
            <CoverContainer>
              <Cover
                src={
                  poster_path
                    ? constructImageUri(poster_path, posterSizes.w500)
                    : require("../Assets/noPosterSmall.png")
                }
              />
            </CoverContainer>
            <TextContainer>
              {/* Breadcrum */}
              <InfoContainer>
                <Info>
                  <InfoItem>
                    <StyledLink to={`/show/${showId}`}>{showTitle}</StyledLink>{" "}
                    {">"}{" "}
                    <StyledLink to={`/show/${showId}/season/${seasonNumber}`}>
                      {seasonName}
                    </StyledLink>{" "}
                    {">"} {episodeDetail.name}
                  </InfoItem>
                </Info>
              </InfoContainer>
              {/* Title */}
              <Title>
                {episodeNumber}화. {episodeDetail.name}
              </Title>
              {/* Airdate */}
              <InfoContainer>
                <Info>
                  {episodeDetail.air_date && (
                    <InfoItem>방영일자: {episodeDetail.air_date}</InfoItem>
                  )}
                </Info>
              </InfoContainer>
              {/* Overview */}
              {episodeDetail.overview && (
                <Overview>{episodeDetail.overview}</Overview>
              )}
            </TextContainer>
          </Contents>
        </>
      );
    }
  }
);

export default EpisodeDetail;
