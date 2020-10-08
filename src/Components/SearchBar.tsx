import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { device } from "../Styles/Responsive";

// Type
import { Theme } from "../@types/style";

// Hooks
import useRecentSearch from "../Hooks/useRecentSearch";

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

  /* Style */
  color: ${({ theme }: { theme: Theme }) => theme.enabled};

  /* Placeholder */
  ::placeholder {
    font-size: 0.8em;
    color: ${({ theme }: { theme: Theme }) => theme.disabled};
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
    const [_, addTerm, __] = useRecentSearch();

    // Event callbacks
    const handleSearchInput = (event: any) => {
      setTerm(event.target.value);
    };

    const handleSubmit = (event: any) => {
      event.preventDefault();
      addTerm(term);
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
