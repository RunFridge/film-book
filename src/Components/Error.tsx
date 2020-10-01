import React, { ReactElement } from "react";
import styled from "styled-components";

const Container = styled.div`
  /* Grixbox */
  display: grid;
  place-items: center;

  /* Size */
  padding: 5vh 50px;

  /* Misc */
  user-select: none;
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

const Loading = (): ReactElement => (
  <Container>
    <img
      src="https://res.cloudinary.com/dgggcrkxq/image/upload/v1592437592/noticon/yucvpr6jzidhqlja5zxq.png"
      alt="error-logo"
      width="100px"
    />
    <ErrorTitle>오류가 발생하였습니다!</ErrorTitle>
    <h5></h5>
    <ErrorContact>
      <small>
        관리자에게{" "}
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

export default Loading;
