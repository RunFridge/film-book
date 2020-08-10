import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import globalSize from "../Style/globalSize";
import FontAwesomeIcon from "./FontAwesomeIcon";

const Container = styled.div`
  padding-top: 150px;
  width: 100%;
  height: 20vh;
  ${globalSize.flexCenter};
  flex-direction: column;
  user-select: none;

  & > :not(:last-child) {
    margin-bottom: 20px;
  }
  & > a {
    text-decoration: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
    color: inherit;
    &:visited {
      color: inherit;
    }
  }
`;

const Error = (props) => {
  console.log(props.msg);
  return (
    <Container>
      <FontAwesomeIcon class="fas fa-exclamation-circle" size="5rem" />
      <h1>Oops!</h1>
      <p>Something went wrong...</p>
      <Link to="/">Return Home</Link>
    </Container>
  );
};

export default Error;
