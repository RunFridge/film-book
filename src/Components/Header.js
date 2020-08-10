import React, { useCallback, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import vars from "../Style/vars";
import FontAwesomeIcon from "./FontAwesomeIcon";

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
  color: inherit;
  &:visited {
    color: inherit;
  }
`;

const Form = styled.form`
  cursor: text;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  width: 20rem;
  background-color: #f5f5f7;
`;

const Input = styled.input`
  all: unset;
  margin-left: 15px;
  width: 100%;
  &::placeholder {
    color: rgba(0, 0, 0, 0.2);
    font-size: 0.9rem;
  }
`;

export default withRouter(({ location: { pathname }, history: { push } }) => {
  const [query, setQuery] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    push(`/search?query=${query}`);
  };

  const onChange = useCallback((e) => {
    setQuery(e.target.value);
  }, []);

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
          <Form onSubmit={onSubmit}>
            <SearchBar>
              <FontAwesomeIcon class="fas fa-search" color="rgba(0,0,0,0.2)" />
              <Input
                onChange={onChange}
                placeholder="작품, 제목, 배우, 감독을 검색해보세요."
              />
            </SearchBar>
          </Form>
        </Item>
        <Item current={pathname === "/settings"}>
          <StyledLink to="/settings">설정</StyledLink>
        </Item>
      </HeaderDiv>
    </Header>
  );
});
