import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Poster from "./Poster";
import { constructTMDBPosterUrl } from "../Utils/utils";
import { useScreenSize } from "../Hooks/useScreenSize";
import { size } from "../Style/devices";

const parsePx = (pxSize) => {
  // Parses px sized string to number
  return parseInt(pxSize.replace("px", ""), 10);
};

const PosterSlider = ({
  array,
  phonePerView,
  tabletPerView,
  desktopPerView,
  spacing,
}) => {
  const [spv, setSpv] = useState(desktopPerView);
  const [ref] = useKeenSlider({
    slidesPerView: spv,
    spacing,
  });
  const width = useScreenSize();

  useEffect(() => {
    if (parsePx(size.minPhone) <= width && width <= parsePx(size.maxPhone)) {
      console.log("phone");
      setSpv(phonePerView);
    } else if (
      parsePx(size.minTablet) <= width &&
      width <= parsePx(size.maxTablet)
    ) {
      console.log("tablet");
      setSpv(tabletPerView);
    } else {
      console.log("desktop");
      setSpv(desktopPerView);
    }
  }, [width, phonePerView, tabletPerView, desktopPerView]);

  return (
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
