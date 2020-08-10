import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import vars from "../Style/vars";

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 10;
  padding: ${vars.bodySidePadding};
`;

const HeaderDiv = styled.div`
  display: flex;
  &:first-child {
    justify-content: flex-start;
  }
  &:last-child {
    justify-content: flex-end;
  }
`;

const List = styled.ul`
  display: flex;
`;

const Item = styled.li`
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  font-weight: ${(props) => (props.current ? "bold" : "normal")};
  &:not(:last-child) {
    margin-right: 30px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  &:visited {
    color: inherit;
  }
`;

export default withRouter(({ location: { pathname } }) => {
  const onSubmit = (e) => e.preventDefault();
  return (
    <Header>
      <HeaderDiv>
        <List>
          <Item>
            <StyledLink to="/">
              <img
                src="https://via.placeholder.com/150x35"
                alt="Logo Placeholder"
              />
            </StyledLink>
          </Item>
          <Item current={pathname === "/"}>
            <StyledLink to="/">영화</StyledLink>
          </Item>
          <Item current={pathname === "/shows"}>
            <StyledLink to="/shows">TV 프로그램</StyledLink>
          </Item>
        </List>
      </HeaderDiv>
      <HeaderDiv>
        <Item>
          <input type="text" />
        </Item>
        <Item current={pathname === "/settings"}>
          <StyledLink to="/settings">설정</StyledLink>
        </Item>
      </HeaderDiv>
    </Header>
  );
});
