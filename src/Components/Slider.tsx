import React, { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import { device } from "../Styles/Responsive";

// Keen Slider
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { size } from "../Styles/Responsive";

// Components
import Poster from "./Poster";

// Types
import { Movie, Person, Show } from "../@types/graphqlTypes";
import useScreenSize from "../Hooks/useScreenSize";
import { Theme } from "../@types/style";

/*
==========================
    Styled Components
==========================
*/
const SliderWrapper = styled.div`
  /* Position */
  position: relative;

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

const SliderContainer = styled.div<{ posterCount: number }>`
  /* Display */
  display: flex;

  /* Size */
  height: 100%;
  margin-top: 15px;

  /* Gradient Slider */
  &::before {
    /* Display */
    display: ${({ posterCount }) => (posterCount <= 2 ? "none" : "block")};

    content: "";
    /* Position */
    position: absolute;
    left: 0;
    z-index: 5;
    /* Size */
    height: 100%;
    width: 5%;

    background: ${({ theme }: { theme: Theme }) => theme.bgPrimary};
    background: linear-gradient(
      90deg,
      ${({ theme }: { theme: Theme }) => theme.bgPrimary} 10%,
      transparent 100%
    );
  }
  &::after {
    /* Display */
    display: ${({ posterCount }) => (posterCount <= 2 ? "none" : "block")};

    content: "";
    /* Position */
    position: absolute;
    right: 0;
    z-index: 5;
    /* Size */
    height: 100%;
    width: 5%;

    background: ${({ theme }: { theme: Theme }) => theme.bgPrimary};
    background: linear-gradient(
      270deg,
      ${({ theme }: { theme: Theme }) => theme.bgPrimary} 10%,
      transparent 100%
    );
  }
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
  const posterLength = movies
    ? movies.length
    : shows
    ? shows.length
    : people
    ? people.length
    : 0;
  const initialSlide = posterLength <= 2 ? 0 : Math.floor(posterLength / 2);

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
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    slidesPerView,
    centered: true,
    initial: initialSlide,
    slides: ".slide",
  });

  // React Element
  return (
    <SliderWrapper>
      <SliderTitle>{sliderTitle}</SliderTitle>
      <SliderContainer
        ref={sliderRef}
        className="keen-slider"
        posterCount={
          movies
            ? movies.length
            : shows
            ? shows.length
            : people
            ? people.length
            : 5
        }
      >
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
