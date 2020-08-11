import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Poster from "../Poster";
import { constructTMDBPosterUrl } from "../../Utils/utils";
import { useScreenSize } from "../../Hooks/useScreenSize";
import { size } from "../../Style/devices";
import { PrevNav, NextNav } from "./SliderNav";
import { parsePx, zerosArr } from "../../Utils/utils";

const Wrapper = styled.div`
  position: relative;
`;

const PosterSlider = ({
  array,
  phonePerView,
  tabletPerView,
  desktopPerView,
  spacing,
  isMovie,
  isPerson,
}) => {
  const [spv, setSpv] = useState(desktopPerView);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [ref, slider] = useKeenSlider({
    slidesPerView: spv,
    spacing,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide);
    },
  });
  const width = useScreenSize();

  useEffect(() => {
    if (parsePx(size.minPhone) <= width && width <= parsePx(size.maxPhone)) {
      setSpv(phonePerView);
    } else if (
      parsePx(size.minTablet) <= width &&
      width <= parsePx(size.maxTablet)
    ) {
      setSpv(tabletPerView);
    } else {
      setSpv(desktopPerView);
    }
  }, [width, phonePerView, tabletPerView, desktopPerView]);

  return (
    <Wrapper>
      {slider && array.length > 0 ? ( // Only render nav buttons when there are more than 1 element
        <>
          <PrevNav disabled={slider && currentSlide === 0} prev={slider.prev} />
          <NextNav
            disabled={slider && currentSlide === slider.details().size - spv}
            next={slider.next}
          />
        </>
      ) : null}
      <div ref={ref} className="keen-slider">
        {isPerson // 인물 슬라이더
          ? array.map((content, idx) => (
              <div key={idx} className="keen-slider__slide">
                <Poster
                  id={content.id}
                  title={content.name}
                  posterImage={constructTMDBPosterUrl(
                    content.profile_path,
                    "500"
                  )}
                  releaseDate={null}
                  voteAverage={null}
                  isMovie={false}
                  isPerson={true}
                />
              </div>
            ))
          : array.map((
              content,
              idx // TV, 영화 슬라이더
            ) => (
              <div key={idx} className="keen-slider__slide">
                <Poster
                  id={content.id}
                  title={isMovie ? content.title : content.name}
                  posterImage={constructTMDBPosterUrl(
                    content.poster_path,
                    "500"
                  )}
                  releaseDate={
                    isMovie
                      ? content.release_date
                      : content.first_air_date
                      ? content.first_air_date
                      : null
                  }
                  voteAverage={content.vote_average}
                  isMovie={isMovie}
                />
              </div>
            ))}
        {/*  slidesPerView 보다 객체수가 적을 경우 keen-slider 객체 크기그 늘어나는것을 방지 */}
        {/* 예) slidesPerView = 6 그리고 객체수 2개 일시, 4개의 빈 객체 생성 */}
        {array.length < spv &&
          zerosArr(spv - array.length).map((_, idx) => (
            <div key={idx} className="keen-slider__slide" />
          ))}
      </div>
    </Wrapper>
  );
};

PosterSlider.propTypes = {
  array: PropTypes.array.isRequired,
  phonePerView: PropTypes.number.isRequired,
  tabletPerView: PropTypes.number.isRequired,
  desktopPerView: PropTypes.number.isRequired,
  spacing: PropTypes.number.isRequired,
  isMovie: PropTypes.bool,
  isPerson: PropTypes.bool,
};

export default PosterSlider;
