import React, { ReactElement } from "react";
import styled from "styled-components";

// Type
import { Theme } from "../@types/style";

/*
==========================
    Styled Components
==========================
*/
const Form = styled.form`
  /* Display */
  display: flex;
  justify-content: center;
  align-items: center;

  /* Style */
  background: ${({ theme }: { theme: Theme }) => theme.bgSecondary};
  border-radius: 2em;

  /* Size */
  padding: 8px 15px;
  width: 100%;
  height: 80%;
  margin: 0 15px;
`;

const FontAwesomeIcon = styled.i`
  color: gray;
`;

const Input = styled.input`
  /* Reset */
  all: unset;

  /* Size */
  padding: 0 15px;
  height: 100%;
  width: 90%;

  /* Font Style */
  font-size: 1.1em;

  /* Placeholder */
  ::placeholder {
    color: gray;
  }
`;

/*
==========================
    React Element
==========================
*/
const MobileSearchBar = (): ReactElement => {
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <FontAwesomeIcon className="fas fa-search" />
      <Input type="text" placeholder="작품 제목,배우,감독을 검색해보세요." />
    </Form>
  );
};

export default MobileSearchBar;
