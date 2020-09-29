import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.header``;

const Header = withRouter(({ location: { pathname } }) => {
  return <Wrapper>Navbar</Wrapper>;
});

export default Header;
