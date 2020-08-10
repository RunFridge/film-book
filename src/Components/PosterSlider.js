import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Poster from "./Poster";
import { constructTMDBPosterUrl } from "../Utils/utils";
import { useScreenSize } from "../Hooks/useScreenSize";
import { size } from "../Style/devices";
import { PrevNav, NextNav } from "./SliderNav";

const parsePx = (pxSize) => {
  // Parses px sized string to number
  return parseInt(pxSize.replace("px", ""), 10);
};

const SliderWrapper = styled.div`
  position: relative;
`;

const PosterSlider = ({
  array,
  phonePerView,
  tabletPerView,
  desktopPerView,
  spacing,
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
    <SliderWrapper>
      {slider ? (
        <>
          <PrevNav disabled={slider && currentSlide === 0} prev={slider.prev} />
          <NextNav
            disabled={slider && currentSlide === slider.details().size - spv}
            next={slider.next}
          />
        </>
      ) : null}
      <div ref={ref} className="keen-slider">
        {array.map((content, idx) => (
          <div key={idx} className="keen-slider__slide">
            <Poster
              id={content.id}
              title={content.title}
              posterImage={constructTMDBPosterUrl(content.poster_path, "500")}
              releaseDate={content.release_date}
              voteAverage={content.vote_average}
              isMovie={true}
            />
          </div>
        ))}
      </div>
    </SliderWrapper>
  );
};

PosterSlider.propTypes = {
  array: PropTypes.array.isRequired,
  phonePerView: PropTypes.number.isRequired,
  tabletPerView: PropTypes.number.isRequired,
  desktopPerView: PropTypes.number.isRequired,
  spacing: PropTypes.number.isRequired,
};

export default PosterSlider;
