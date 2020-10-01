import React, { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";

// Keen Slider
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { size } from "../Styles/Responsive";

// Components
import Poster from "./Poster";

// Types
import { Movie } from "../@types/graphqlTypes";
import useScreenSize from "../Hooks/useScreenSize";
import { Theme } from "../@types/style";

/*
==========================
    Styled Components
==========================
*/
const SliderWrapper = styled.div`
  /* Size */
  padding: 0 30px;
  &:not(:last-child) {
    margin-bottom: 5px;
  }
`;

const SliderContainer = styled.div`
  /* Display */
  display: flex;

  /* Size */
  height: 100%;
  margin-top: 15px;
`;

const SliderTitle = styled.h3`
  /* Font style */
  font-size: 2em;
  font-weight: 700;
  border-bottom: 0.5px solid ${({ theme }: { theme: Theme }) => theme.disabled};
  text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.3);

  /* Misc */
  user-select: none;
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
  const [slidesPerView, setSlidesPerView] = useState(6);

  useEffect((): void => {
    if (size.minPhone < width && width < size.maxPhone) {
      // Phone
      setSlidesPerView(2);
    } else if (size.minTablet < width && width < size.maxTablet) {
      // Tablet
      setSlidesPerView(5);
    } else {
      // Desktop
      setSlidesPerView(6);
    }
  }, [width]);

  // Keen Slider REF
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    slidesPerView,
  });

  // React Element
  return (
    <SliderWrapper>
      <SliderTitle>{sliderTitle}</SliderTitle>
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
