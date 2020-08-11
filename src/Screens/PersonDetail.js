import React from "react";
import styled from "styled-components";
import useAxios from "../Hooks/useAxios";
import { tmdbPeopleApi } from "../api";
import Loading from "../Components/Loading";
import Error from "../Components/Error";
import { constructTMDBPosterUrl, constructIMDBUrl } from "../Utils/utils";
import PosterSlider from "../Components/Slider/PosterSlider";

const Container = styled.div`
  padding-top: 60px;
  height: 80vh;
  width: 100%;
  position: relative;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 50px;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Header = styled.h3`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
  border-bottom: 1px solid ${(props) => props.theme.colors.inputBackdrop};
  user-select: none;
`;

const InfoContainer = styled.div`
  margin: 20px 0;
  color: ${(props) => props.theme.colors.extreme};
  & > :not(:last-child) {
    ::after {
      content: "•";
      margin: 0 10px;
    }
  }
`;

const Info = styled.span``;

const Cover = styled.div`
  width: 20%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 50%;
  border-radius: 5px;
`;

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
`;

const StyledAnchor = styled.a`
  all: unset;
  cursor: pointer;
`;

const StyledIcon = styled.i`
  font-size: 2rem;
`;

const PersonDetail = ({
  match: {
    params: { id },
  },
}) => {
  const { loading, data, error } = useAxios(function () {
    return tmdbPeopleApi.personDetail(id);
  });
  return loading ? (
    <Loading />
  ) : error ? (
    <Error />
  ) : (
    <Container>
      <Content>
        <Cover
          bgImage={constructTMDBPosterUrl(data.profile_path, "original")}
        />
        <Data>
          <Title>{data.name}</Title>
          <InfoContainer>
            {data.known_for_department && (
              <Info>{data.known_for_department}</Info>
            )}
            {data.birthday && <Info>{data.birthday}</Info>}
            {data.place_of_birth && <Info>{data.place_of_birth}</Info>}
          </InfoContainer>
          <LinkContainer>
            {data.imdb_id && (
              <StyledAnchor
                href={constructIMDBUrl(data.imdb_id)}
                target="blank"
              >
                <StyledIcon
                  className="fab fa-imdb"
                  style={{ color: "#f6c700" }}
                />
              </StyledAnchor>
            )}
          </LinkContainer>
          {data.movie_credits && data.movie_credits.cast && (
            <>
              <Header>참여 작품</Header>
              <PosterSlider
                array={data.movie_credits.cast}
                phonePerView={2}
                tabletPerView={5}
                desktopPerView={6}
                spacing={30}
                navMargin="-40px"
                isMovie={true}
              />
            </>
          )}
        </Data>
      </Content>
    </Container>
  );
};

export default PersonDetail;
