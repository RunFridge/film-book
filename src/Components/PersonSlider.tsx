import React, { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { device, size } from "../Styles/Responsive";

// Types
import { Cast, Crew, PersonCredits } from "../@types/graphqlTypes";
import { Theme } from "../@types/style";

// Hooks
import useScreenSize from "../Hooks/useScreenSize";

// Keen Slider
import { PrevNav, NextNav } from "./SliderNav";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

// Utils
import { constructImageUri, posterSizes, shortenLongText } from "../Utils";

/*
==========================
    Styled Components
==========================
*/
const Container = styled.div`
  /* Size */
  padding: 0 30px;
  &:not(:last-child) {
    margin-bottom: 5px;
  }
  &:last-child {
    padding-bottom: 15px;
  }
`;

const FAIcon = styled.i`
  /* Size */
  margin-right: 15px;
`;

const SliderTitle = styled.h3`
  /* Font Style */
  font-size: 2em;

  /* Size */
  margin: 10px 0;

  /* Border */
  font-weight: 700;
  border-bottom: 0.5px solid ${({ theme }: { theme: Theme }) => theme.disabled};
  text-shadow: 2px 4px 3px ${({ theme }: { theme: Theme }) => theme.textShadow};
`;

const KeenSlider = styled.div`
  /* Size */
  height: 100%;
  margin-top: 15px;
`;

const StyledLink = styled(Link)`
  /* Display */
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  /* Link Style */
  text-decoration: none;
  color: inherit;
  &::visited {
    color: inherit;
  }
  outline: 0;

  /* Hover */
  &:hover > img {
    filter: drop-shadow(
      2px 2px 10px ${({ theme }: { theme: Theme }): string => theme.textShadow}
    );
  }
`;

const PosterImage = styled.img`
  /* Size */
  width: 40vw;

  /* Box Style */
  border-radius: 1em;

  /* Responsive */
  ${device.desktop} {
    width: 14vw;
  }
  ${device.tablet} {
    width: 15vw;
  }
`;

const Contents = styled.div`
  /* Size */
  max-width: 40vw;

  /* Responsive */
  ${device.desktop} {
    max-width: 14vw;
  }
  ${device.tablet} {
    max-width: 15vw;
  }
`;

const Title = styled.h3`
  /* Size */
  margin-bottom: 0.25em;
`;

const SubInfo = styled.p`
  /* Size */
  margin-bottom: 0.25em;

  /* Font style */
  opacity: 0.8;
`;

/*
==========================
    React Element [Poster]
==========================
*/
const Poster = ({
  id,
  title,
  character,
  department,
  job,
  posterSrc,
  isCrew = false,
  isMovie = false,
}: {
  id: number;
  title?: string;
  character?: string;
  department?: string;
  job?: string;
  posterSrc?: string;
  isCrew?: boolean;
  isMovie?: boolean;
}): ReactElement => {
  // Shorten name/title of the movie or show
  let shortenTitle: string | undefined;
  if (title) {
    shortenTitle = shortenLongText(13, title);
  }

  // Shorten character/department/job of the movie or show
  let shortenCharacter: string | undefined;
  let shortenDepartment: string | undefined;
  let shortenJob: string | undefined;
  if (character) {
    shortenCharacter = shortenLongText(20, character);
  }
  if (department) {
    shortenDepartment = shortenLongText(20, department);
  }
  if (job) {
    shortenJob = shortenLongText(20, job);
  }

  return (
    <StyledLink
      to={isMovie ? `/movie/${id}` : `/show/${id}`}
      className="keen-slider__slide"
    >
      <PosterImage
        src={
          posterSrc
            ? constructImageUri(posterSrc, posterSizes.w500)
            : require("../Assets/noPosterSmall.png")
        }
      />
      <Contents>
        <Title title={title}>{shortenTitle}</Title>
        {isCrew ? (
          <>
            <SubInfo title={department}>{shortenDepartment}</SubInfo>
            <SubInfo title={job}>{shortenJob}</SubInfo>
          </>
        ) : (
          <>
            <SubInfo title={character}>{shortenCharacter}</SubInfo>
          </>
        )}
      </Contents>
    </StyledLink>
  );
};

/*
==========================
    React Element [Slider]
==========================
*/
const PersonSlider = ({
  cast,
  crew,
  isMovie = false,
}: {
  cast?: Array<Cast> | null;
  crew?: Array<Crew> | null;
  isMovie?: boolean;
}): ReactElement => {
  // Hooks & States
  const [width, _] = useScreenSize();
  const [slidesPerView, setSlidesPerView] = useState(2);
  const [currentSlide, setCurrentSlide] = useState(0);
  let posterLength: number = 0;
  if (cast) posterLength += cast.length;
  if (crew) posterLength += crew.length;

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

  if (cast && cast.length !== 0) {
    return (
      <Container>
        {/* Movie Cast */}
        <SliderTitle>
          {isMovie ? (
            <>
              <FAIcon className="fas fa-film" />
              영화 캐스트 참여 작품
            </>
          ) : (
            <>
              <FAIcon className="fas fa-tv" />
              TV 프로그램 캐스트 참여 작품
            </>
          )}
        </SliderTitle>
        {/* Movie Cast Slider */}
        <KeenSlider ref={sliderRef} className="keen-slider">
          {/* Slider navigation */}
          {slider && posterLength > slidesPerView ? (
            <>
              <PrevNav
                disabled={slider && currentSlide === 0}
                prev={slider.prev}
              />
              <NextNav
                disabled={
                  slider &&
                  currentSlide === slider.details().size - slidesPerView
                }
                next={slider.next}
              />
            </>
          ) : null}
          {/* Posters */}
          {cast
            ? cast.map((c, idx) => (
                <Poster
                  key={idx}
                  id={c.id}
                  title={isMovie ? c.title : c.name}
                  posterSrc={c.poster_path}
                  character={c.character}
                  isMovie={isMovie}
                />
              ))
            : null}
        </KeenSlider>
      </Container>
    );
  } else if (crew && crew.length !== 0) {
    return (
      <Container>
        {/* Movie Cast */}
        <SliderTitle>
          {isMovie ? (
            <>
              <FAIcon className="fas fa-film" />
              영화 크루 참여 작품
            </>
          ) : (
            <>
              <FAIcon className="fas fa-tv" />
              TV 프로그램 크루 참여 작품
            </>
          )}
        </SliderTitle>
        {/* Movie Cast Slider */}
        <KeenSlider ref={sliderRef} className="keen-slider">
          {/* Slider navigation */}
          {slider && posterLength > slidesPerView ? (
            <>
              <PrevNav
                disabled={slider && currentSlide === 0}
                prev={slider.prev}
              />
              <NextNav
                disabled={
                  slider &&
                  currentSlide === slider.details().size - slidesPerView
                }
                next={slider.next}
              />
            </>
          ) : null}
          {/* Posters */}
          {crew
            ? crew.map((c, idx) => (
                <Poster
                  key={idx}
                  id={c.id}
                  title={isMovie ? c.original_title : c.original_name}
                  posterSrc={c.poster_path}
                  department={c.department}
                  job={c.job}
                  isCrew
                  isMovie={isMovie}
                />
              ))
            : null}
        </KeenSlider>
      </Container>
    );
  } else {
    // No entry
    return <></>;
  }
};

export default PersonSlider;
