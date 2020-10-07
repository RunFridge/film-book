import React, { ReactElement } from "react";
import styled from "styled-components";

// Types
import { PersonCredits } from "../@types/graphqlTypes";

/*
==========================
    Styled Components
==========================
*/
const Container = styled.div`
  /* Size */
  padding: 0 30px;
`;

const FAIcon = styled.i`
  /* Size */
  margin-left: 5px;
`;

const SliderTitle = styled.h3`
  /* Size */
  margin: 10px 0;
`;

/*
==========================
    React Element
==========================
*/
const PersonSlider = ({
  credits,
  isMovie = false,
}: {
  credits: PersonCredits;
  isMovie?: boolean;
}): ReactElement => {
  const { cast, crew } = credits;

  if (isMovie) {
    //   Movie Slider
    return (
      <Container>
        <SliderTitle>
          출연/제작 영화
          <FAIcon className="fas fa-film" />
        </SliderTitle>
      </Container>
    );
  } else {
    //   TV Slider
    return (
      <Container>
        <SliderTitle>
          출연/제작 TV 프로그램
          <FAIcon className="fas fa-tv" />
        </SliderTitle>
      </Container>
    );
  }
};

export default PersonSlider;
