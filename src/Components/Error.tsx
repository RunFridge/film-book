import React, { ReactElement } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";

// Type
import { Theme } from "../@types/style";

const Container = styled.div`
  /* Flexbox */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* Size */
  height: calc(100vh - 160px);

  /* Style */
  background: ${({ theme }: { theme: Theme }) => theme.bgPrimary};
  color: ${({ theme }: { theme: Theme }) => theme.enabled};

  /* Misc */
  & > img {
    user-select: none;
  }
`;

const ErrorTitle = styled.h1`
  /* Size */
  margin: 0.5em;

  /* Font Style */
  font-size: 1.5em;
`;

const ErrorContact = styled.p`
  /* Size */
  margin: 0.8em;

  /* View */
  opacity: 0.8;
`;

const ContactLink = styled.a`
  /* Link Style */
  text-decoration: none;
  border-bottom: 1px solid;
`;

const Error = ({ message }: { message: string }): ReactElement => (
  <Container>
    <Helmet>
      <title>Film Book 2.0 | Error</title>
    </Helmet>
    <img
      src={require("../Assets/errorLogo.png")}
      alt="error-logo"
      width="150px"
      draggable={false}
    />
    <ErrorTitle>오류가 발생하였습니다!</ErrorTitle>
    <h5>오류 메세지: {message}</h5>
    <ErrorContact>
      <small>
        오류 메세지와 함께, 관리자에게{" "}
        <ContactLink
          href="https://github.com/RunFridge/film-book/issues"
          target="_blank"
        >
          문의
        </ContactLink>{" "}
        부탁 드립니다.
      </small>
    </ErrorContact>
  </Container>
);

export default Error;
