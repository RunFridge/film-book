import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
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
const SearchBar = withRouter(
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

export default SearchBar;
