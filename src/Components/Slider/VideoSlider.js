import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useKeenSlider } from "keen-slider/react";
import YouTube from "react-youtube";
import { PrevNav, NextNav } from "./SliderNav";

const opts = {
  height: "390",
  width: "640",
};

const Wrapper = styled.div`
  margin-top: 100px;
  position: relative;
`;

const KeenContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const VideoSlider = ({ videos }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [ref, slider] = useKeenSlider({
    slidesPerView: 1,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide);
    },
  });

  return (
    <Wrapper>
      {slider && videos.length > 0 ? ( // Only render nav buttons when there are more than 1 element
        <>
          <PrevNav
            disabled={slider && currentSlide === 0}
            prev={slider.prev}
            navMargin="80px"
          />
          <NextNav
            disabled={slider && currentSlide === slider.details().size - 1}
            next={slider.next}
            navMargin="80px"
          />
        </>
      ) : null}
      <div ref={ref} className="keen-slider">
        {videos.map((video, idx) => (
          <KeenContainer key={idx} className="keen-slider__slide">
            <YouTube videoId={video.key} opts={opts} />
          </KeenContainer>
        ))}
      </div>
    </Wrapper>
  );
};

VideoSlider.propTypes = {
  videos: PropTypes.array,
};

export default VideoSlider;
