import React from "react";
import PropTypes from "prop-types";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Poster from "./Poster";
import { constructTMDBPosterUrl } from "../Utils/utils";

const PosterSlider = ({ array, slidesPerView = 6, spacing = 15 }) => {
  const [ref] = useKeenSlider({ slidesPerView, spacing });
  return (
    <div ref={ref} className="keen-slider">
      {array.map((content, idx) => (
        <div key={idx} className="keen-slider__slide">
          <Poster
            id={content.id}
            title={content.title}
            posterImage={constructTMDBPosterUrl(content.poster_path)}
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
  slidesPerView: PropTypes.number.isRequired,
  spacing: PropTypes.number.isRequired,
};

export default PosterSlider;
