import React from "react";
import styled from "styled-components";
import globalSize from "../Style/globalSize";
import { Link } from "react-router-dom";

const NOOOO_URL =
  "https://backalleysoapbox.files.wordpress.com/2013/07/office-no.gif";

const Container = styled.div`
  text-align: center;
  & > :not(:last-child) {
    margin-bottom: 30px;
  }
  user-select: none;
  ${globalSize.flexCenter};
  flex-direction: column;
  & > a {
    text-decoration: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
    color: inherit;
    &:visited {
      color: inherit;
    }
  }
`;

const Error404 = styled.h1`
  font-size: 4rem;
`;
const ErrorDesc = styled.h3`
  font-size: 2rem;
`;

const NooooooImg = styled.div`
  width: 400px;
  height: 350px;
  background-image: url(${NOOOO_URL});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 15px;
`;

const Page404 = ({ location: { pathname } }) => {
  return (
    <Container>
      <Error404>
        [404] Page not found{" "}
        <span role="img" aria-label="Sad Face">
          😭
        </span>
      </Error404>
      <ErrorDesc>"{pathname}"에 해당되는 페이지를 찾을 수 없습니다</ErrorDesc>
      <NooooooImg />
      <Link to="/">Return Home</Link>
    </Container>
  );
};

export default Page404;
