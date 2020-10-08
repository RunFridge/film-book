import React, { ReactElement } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

// Type
import { Theme } from "../@types/style";

// Hooks
import useRecentSearch from "../Hooks/useRecentSearch";

/*
==========================
    Styled Components
==========================
*/
const Description = styled.h3`
  /* Size */
  padding: 15px;

  /* Font Style */
  color: ${({ theme }: { theme: Theme }) => theme.disabled};
`;

const EmptyDesc = styled.li`
  /* Size */
  padding: 15px;
`;

const Container = styled.ul`
  /* Size */
  padding: 0;
`;

const SearchTerm = styled.li`
  /* Flexbox */
  display: flex;
  align-items: center;

  /* Size */
  padding: 0 15px;

  /* Border */
  border-bottom: 1px dotted ${({ theme }: { theme: Theme }) => theme.disabled};
  &:first-child {
    border-top: 1px dotted ${({ theme }: { theme: Theme }) => theme.disabled};
  }
`;

const Term = styled.span`
  /* Size */
  width: 90%;
  padding: 15px 0;

  /* Misc */
  cursor: pointer;
`;

const RemoveButton = styled.button`
  /* Reset Button */
  all: unset;

  /* Size */
  width: 10%;

  /* Flexbox */
  display: flex;
  justify-content: center;

  /* Font Style */
  color: ${({ theme }: { theme: Theme }) => theme.disabled};

  /* Hover */
  &:hover {
    color: ${({ theme }: { theme: Theme }) => theme.enabled};
  }

  /* FA Pseudo element */
  &::after {
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    content: "\f2ed";
  }

  /* Misc */
  cursor: pointer;
`;

/*
==========================
    React Element
==========================
*/
const MobileSearch = withRouter(
  ({ history }): ReactElement => {
    const [recentSearch, addTerm, removeTerm] = useRecentSearch();
    const handleRemove = (event: any) => {
      removeTerm(parseInt(event.target.id, 10));
    };

    const handleSearch = (event: any) => {
      const term = event.target.textContent;
      addTerm(term);
      history.replace({
        pathname: "/results",
        state: {
          term,
        },
      });
    };

    return (
      <>
        <Description>최근 검색 목록</Description>
        <Container>
          {recentSearch.length === 0 && (
            <EmptyDesc>😱 최근 검색 목록이 비었습니다.</EmptyDesc>
          )}
          {/* Reversed recent search list (recent comes first) */}
          {recentSearch
            .slice(0)
            .reverse()
            .map((term, idx) => (
              <SearchTerm key={idx}>
                <Term onClick={handleSearch}>{term}</Term>
                <RemoveButton
                  id={(recentSearch.length - 1 - idx).toString()}
                  onClick={handleRemove}
                />
              </SearchTerm>
            ))}
        </Container>
      </>
    );
  }
);

export default MobileSearch;
