import React, { ReactElement } from "react";
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
  min-height: calc(100vh - 160px);
  padding: 0;
`;

/*
==========================
    React Element
==========================
*/
const MobileSearch = (): ReactElement => {
  return <Container>MobileSearch</Container>;
};

export default MobileSearch;
