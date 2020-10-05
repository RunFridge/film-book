import React, { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import { device, size } from "../Styles/Responsive";

// Hooks
import useScreenSize from "../Hooks/useScreenSize";

// Keen Slider
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

// Components
import Poster from "./Poster";
import { NextNav, PrevNav } from "./SliderNav";

// Types
import { Movie, Person, Show } from "../@types/graphqlTypes";
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
  &:last-child {
    padding-bottom: 15px;
  }

  /* Responsive */
  ${device.desktop} {
    padding: 30px;
  }
`;

const SliderContainer = styled.div`
  /* Size */
  height: 100%;
  margin-top: 15px;
`;

const SliderTitle = styled.h3`
  /* Font style */
  font-size: 2em;
  font-weight: 700;
  border-bottom: 0.5px solid ${({ theme }: { theme: Theme }) => theme.disabled};
  text-shadow: 2px 4px 3px ${({ theme }: { theme: Theme }) => theme.textShadow};
`;

/*
==========================
    React Element
==========================
*/
const Slider = ({
  movies,
  shows,
  people,
  sliderTitle,
}: {
  movies?: [Movie];
  shows?: [Show];
  people?: [Person];
  sliderTitle: string;
}): ReactElement => {
  // States
  const [width, _] = useScreenSize();
  const [slidesPerView, setSlidesPerView] = useState(2);
  const [currentSlide, setCurrentSlide] = useState(0);
  const posterLength = movies
    ? movies.length
    : shows
    ? shows.length
    : people
    ? people.length
    : 0;

  // Responsive slider with screen size
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
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    slidesPerView,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide);
    },
  });

  // React Element
  return (
    <SliderWrapper>
      <SliderTitle>{sliderTitle}</SliderTitle>
      <SliderContainer ref={sliderRef} className="keen-slider">
        {slider && posterLength > 2 ? ( // Only render nav buttons when there are more than 2 element
          <>
            <PrevNav
              disabled={slider && currentSlide === 0}
              prev={slider.prev}
            />
            <NextNav
              disabled={
                slider && currentSlide === slider.details().size - slidesPerView
              }
              next={slider.next}
            />
          </>
        ) : null}
        {movies &&
          movies.map(
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
        {shows &&
          shows.map(
            ({
              id,
              name,
              first_air_date,
              vote_average,
              poster_path,
            }): ReactElement => (
              <Poster
                key={id}
                id={id}
                name={name}
                firstAirDate={first_air_date}
                rating={vote_average}
                posterSrc={poster_path}
              />
            )
          )}
        {people &&
          people.map(
            ({ id, name, profile_path }): ReactElement => (
              <Poster
                key={id}
                id={id}
                name={name}
                posterSrc={profile_path}
                isPerson
              />
            )
          )}
      </SliderContainer>
    </SliderWrapper>
  );
};

export default Slider;
