import React, { ReactElement } from "react";
import styled from "styled-components";
import { device } from "../Styles/Responsive";

// Type
import { Theme } from "../@types/style";

/*
==========================
    Styled Components
==========================
*/
const Form = styled.form`
  /* Display */
  display: none;

  /* Style */
  background: ${({ theme }: { theme: Theme }) => theme.bgSecondary};
  border-radius: 2em;

  /* Size */
  padding: 8px 15px;

  /* Responsive */
  ${device.desktop} {
    /* Flexbox */
    display: flex;
    align-items: center;
  }
`;

const FontAwesomeIcon = styled.i`
  color: gray;
`;

const Input = styled.input`
  /* Reset */
  all: unset;

  /* Size */
  padding: 0 15px;
  width: 20vw;

  /* Placeholder */
  ::placeholder {
    font-size: 0.8em;
    color: gray;
  }
`;

/*
==========================
    React Element
==========================
*/
const SearchBar = (): ReactElement => {
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <FontAwesomeIcon className="fas fa-search" />
      <Input type="text" placeholder="작품 제목,배우,감독을 검색해보세요." />
    </Form>
  );
};

export default SearchBar;
