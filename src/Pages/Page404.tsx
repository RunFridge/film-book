import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Type
import { Theme } from "../@types/style";

/*
==========================
    Styled Components
==========================
*/
const Container = styled.ul`
  /* Size */
  height: calc(100vh - 261px);
  padding: 30px;

  /* Flexbox */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* Font Style */
  color: ${({ theme }: { theme: Theme }) => theme.enabled};
`;

const Message = styled.h2`
  /* Size */
  margin: 15px 0;
`;

const StyledLink = styled(Link)`
  /* Flexbox */
  display: flex;
  justify-content: center;
  align-items: center;

  /* Span Size */
  & > span {
    margin: 0 5px;
  }

  /* Border style */
  border-bottom: 1px solid transparent;

  /* Hover */
  &:hover {
    border-bottom: 1px solid;
  }

  /* Link Style */
  text-decoration: none;
  color: inherit;
  &:visited {
    color: inherit;
  }
  outline: 0;
`;

/*
==========================
    React Element
==========================
*/
const Page404 = (): ReactElement => (
  <Container>
    <img
      src={require("../Assets/pageNotFound.svg")}
      alt="page-not-found-logo"
      width="250px"
      draggable={false}
    />
    <Message>페이지를 찾을 수 없습니다.</Message>
    <StyledLink to="/">
      <i className="fas fa-home" />
      <span>메인 페이지로</span>
    </StyledLink>
  </Container>
);

export default Page404;
