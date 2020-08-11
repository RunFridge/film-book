import React from "react";
import styled from "styled-components";
import useAxios from "../Hooks/useAxios";
import { Helmet } from "react-helmet";
import { naverMovieApi } from "../api";
import { constructTMDBPosterUrl, constructIMDBUrl } from "../Utils/utils";
import Loading from "../Components/Loading";
import PosterSlider from "../Components/Slider/PosterSlider";

const Container = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 50px;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(5px);
  opacity: 0.5;
  z-index: -10;
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

const Title = styled.span`
  font-size: 4rem;
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

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
`;

const StyledAnchor = styled.a`
  all: unset;
  cursor: pointer;
`;

const Divider = styled.span`
  &::after {
    content: "•";
  }
  margin: 0px 10px;
`;

const NaverLogo = styled.img`
  width: 1.7rem;
  height: 1.7rem;
  border-radius: 5px;
  user-select: none;
`;

const StyledIcon = styled.i`
  font-size: 2rem;
`;

const Overview = styled.p`
  font-size: 1.2rem;
  opacity: 0.7;
  line-height: 1.5;
  width: 100%;
  margin-bottom: 30px;
  color: ${(props) => props.theme.colors.extreme};
`;

const Cover = styled.div`
  width: 100%;
  height: 500px;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  border-radius: 5px;
`;

const SliderContainer = styled.div`
  & > :not(:first-child) {
    margin-top: 50px;
  }
`;

const Detail = ({ data, isMovie }) => {
  const {
    loading: naverLoading,
    data: naverData,
    error: naverError,
  } = useAxios(function () {
    return naverMovieApi.search(isMovie ? data.title : data.name);
  });
  return naverLoading ? (
    <Loading />
  ) : (
    <>
      <Helmet>
        <title>Film Book | {isMovie ? data.title : data.name}</title>
      </Helmet>
      <Container>
        {data.backdrop_path && (
          <Backdrop
            bgImage={constructTMDBPosterUrl(data.backdrop_path, "original")}
          />
        )}
        <Content>
          <Cover
            bgImage={constructTMDBPosterUrl(data.poster_path, "original")}
          />
          <Data>
            <Title>{isMovie ? data.title : data.name}</Title>
            <InfoContainer>
              <Info>
                {isMovie
                  ? data.release_date && data.release_date.split("-")[0]
                  : data.first_air_date && data.first_air_date.split("-")[0]}
              </Info>
              {data.runtime && <Info>{`${data.runtime} min`}</Info>}
              <Info>
                {data.genres &&
                  data.genres.map((genre, index) =>
                    index === data.genres.length - 1
                      ? genre.name
                      : `${genre.name} / `
                  )}
              </Info>
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

              {!naverLoading &&
              !naverError &&
              naverData.items && ( // Show Naver Link if exists
                  <>
                    {data.imdb_id && <Divider />}
                    <StyledAnchor
                      href={naverData.items[0].link}
                      target="_blank"
                    >
                      <NaverLogo
                        src="https://developers.naver.com/inc/devcenter/images/naver_square_20x20.png"
                        alt="Naver link"
                      />
                    </StyledAnchor>
                  </>
                )}
            </LinkContainer>
            <SliderContainer>
              {data.overview && <Overview>{data.overview}</Overview>}
              {data.credits && data.credits.cast && (
                <>
                  <Header>캐스트</Header>
                  <PosterSlider
                    array={data.credits.cast.slice(0, 20)}
                    phonePerView={2}
                    tabletPerView={5}
                    desktopPerView={6}
                    spacing={30}
                    navMargin="-30px"
                    isPerson
                  />
                </>
              )}
              {data.seasons && (
                <>
                  <Header>시즌</Header>
                  <PosterSlider
                    array={data.seasons}
                    phonePerView={2}
                    tabletPerView={5}
                    desktopPerView={6}
                    spacing={30}
                    navMargin="-30px"
                  />
                </>
              )}
            </SliderContainer>
            {/* {data.videos.results.length > 0 && (
              <Trailer title="예고편" videos={result.videos.results} />
            )} */}
          </Data>
        </Content>
      </Container>
    </>
  );
};

export default Detail;
