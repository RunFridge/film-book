import React from "react";
import styled from "styled-components";
import vars from "../Style/vars";
import FontAwesomeIcon from "./FontAwesomeIcon";

const Container = styled.div`
  padding-top: 50px;
  width: 100%;
  height: 20vh;
  ${vars.flexCenter};
  flex-direction: column;
  user-select: none;

  & > :not(:last-child) {
    margin-bottom: 20px;
  }
`;

const Error = (props) => {
  console.log(props.msg);
  return (
    <Container>
      <FontAwesomeIcon class="fas fa-exclamation-circle" size="5rem" />
      <h1>Oops!</h1>
      <p>Something went wrong...</p>
    </Container>
  );
};

export default Error;
