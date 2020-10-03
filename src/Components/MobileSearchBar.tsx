import React, { ReactElement, useState } from "react";
import styled from "styled-components";

// Type
import { History } from "history";
import { Theme } from "../@types/style";
import { withRouter } from "react-router-dom";

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
  height: 50%;
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
const MobileSearchBar = withRouter(
  ({ history }): ReactElement => {
    const [term, setTerm] = useState("");

    // Event callbacks
    const handleSearchInput = (event: any) => {
      setTerm(event.target.value);
    };

    const handleSubmit = (event: any) => {
      event.preventDefault();
      history.replace({
        pathname: "/results",
        state: {
          term,
        },
      });
    };

    return (
      <Form onSubmit={handleSubmit}>
        <FontAwesomeIcon className="fas fa-search" />
        <Input
          type="text"
          placeholder="작품 제목,배우,감독을 검색해보세요."
          onChange={handleSearchInput}
          required
        />
      </Form>
    );
  }
);

export default MobileSearchBar;
