import React, { ReactElement } from "react";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import { useRouteMatch, withRouter } from "react-router-dom";
import { device } from "../Styles/Responsive";

// Components
import Loading from "../Components/Loading";
import Error from "../Components/Error";
import Page404 from "./Page404";

// Utils
import { constructImageUri, posterSizes } from "../Utils";

// Type
import { Person } from "../@types/graphqlTypes";
import { Theme } from "../@types/style";
import PersonSlider from "../Components/PersonSlider";

/*
==========================
    GraphQL query
==========================
*/
const PERSON_DETAIL_QUERY = gql`
  query getPersonDetail($id: Int!) {
    personDetail(id: $id) {
      name
      imdb_id
      also_known_as
      biography
      birthday
      deathday
      profile_path
      movie_credits {
        cast {
          id
          title
          character
          poster_path
        }
        crew {
          id
          original_title
          department
          job
          poster_path
        }
      }
      tv_credits {
        cast {
          id
          name
          character
          poster_path
        }
        crew {
          id
          original_name
          department
          job
          poster_path
        }
      }
    }
  }
`;

/*
==========================
    Styled Components
==========================
*/
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
  width: 100%;
  padding: 0 30px;
`;

const Name = styled.h1`
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

const Biography = styled.p`
  /* Size */
  padding: 15px 0;

  /* Font Style */
  font-size: 1.25em;
  line-height: 1.5em;
`;

/*
==========================
    React Element
==========================
*/
const PersonDetail = withRouter(
  (): ReactElement => {
    const {
      params: { id },
    }: { params: { id: string } } = useRouteMatch();

    const { loading, error, data } = useQuery(PERSON_DETAIL_QUERY, {
      variables: { id: parseInt(id) },
      notifyOnNetworkStatusChange: true,
    });

    if (loading) {
      return <Loading />;
    } else if (error) {
      return <Error message={error.message} />;
    } else {
      const { personDetail }: { personDetail: Person } = data;

      if (!personDetail) {
        // Person ID 존재하지 않음
        return <Page404 />;
      }
      //   Get Korean name
      let korName: string | undefined;
      if (personDetail.also_known_as.length > 0) {
        korName = personDetail.also_known_as[0];
      }

      //   Render contents
      return (
        <>
          <Contents>
            {/* ====== Poster Cover ====== */}
            <CoverContainer>
              <Cover
                src={
                  personDetail.profile_path
                    ? constructImageUri(
                        personDetail.profile_path,
                        posterSizes.w500
                      )
                    : require("../Assets/noPosterSmall.png")
                }
              />
            </CoverContainer>
            {/* ====== Text Information ====== */}
            <TextContainer>
              <Name>{korName ? korName : personDetail.name}</Name>
              <InfoContainer>
                <Info>
                  {korName ? <InfoItem>{personDetail.name}</InfoItem> : null}
                  {personDetail.also_known_as.length > 1 ? (
                    <InfoItem>{personDetail.also_known_as[1]}</InfoItem>
                  ) : null}
                  {personDetail.imdb_id && (
                    <a
                      href={`https://www.imdb.com/name/${personDetail.imdb_id}/`}
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
                  {personDetail.birthday && (
                    <InfoItem>
                      {personDetail.birthday} ~ {personDetail.deathday}
                    </InfoItem>
                  )}
                </Info>
              </InfoContainer>
              <Biography>{personDetail.biography}</Biography>
            </TextContainer>
          </Contents>
          {/* Sliders */}
          {personDetail.movie_credits && (
            <PersonSlider cast={personDetail.movie_credits.cast} isMovie />
          )}
          {personDetail.movie_credits && (
            <PersonSlider crew={personDetail.movie_credits.crew} isMovie />
          )}
          {personDetail.tv_credits && (
            <PersonSlider cast={personDetail.tv_credits.cast} />
          )}
          {personDetail.tv_credits && (
            <PersonSlider crew={personDetail.tv_credits.crew} />
          )}
        </>
      );
    }
  }
);

export default PersonDetail;
