import React, { ReactElement } from "react";
import styled from "styled-components";

// Keen Slider
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

// Components
import Poster from "./Poster";

// Types
import { Movie } from "../@types/graphqlTypes";
import useScreenSize from "../Hooks/useScreenSize";

/*
==========================
    Styled Components
==========================
*/
const SliderWrapper = styled.div`
  /* Size */
  padding: 30px;
`;

const SliderContainer = styled.div`
  /* Display */
  display: flex;

  /* Size */
  height: 100%;
  margin-top: 15px;
`;

/*
==========================
    React Element
==========================
*/
export const MovieSlider = ({
  movies,
  sliderTitle,
}: {
  movies: [Movie];
  sliderTitle: string;
}): ReactElement => {
  // Responsive slider with screen size
  const [width, _] = useScreenSize();

  // Keen Slider REF
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    slidesPerView: 1,
    spacing: 0,
  });

  // React Element
  return (
    <SliderWrapper>
      <h3>{sliderTitle}</h3>
      <SliderContainer ref={sliderRef} className="keen-slider">
        {movies.map(
          ({
            id,
            title,
            release_date,
            vote_average,
            poster_path,
          }): ReactElement => (
            <Poster
              key={id}
              id={id}
              title={title}
              releaseDate={release_date}
              rating={vote_average}
              posterSrc={poster_path}
              isMovie
            />
          )
        )}
      </SliderContainer>
    </SliderWrapper>
  );
};
