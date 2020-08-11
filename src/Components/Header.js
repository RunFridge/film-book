import React, { useCallback, useState, useRef, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import vars from "../Style/vars";
import { device } from "../Style/devices";
import { SearchContext } from "./SearchProvider";

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.headerBg};
  border-bottom: 1px solid ${(props) => props.theme.colors.inputBackdrop};
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
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  font-weight: ${(props) => (props.current ? "bold" : "normal")};
  min-width: fit-content;
  &:not(:last-child) {
    margin-right: 50px;
  }
  @media ${device.phone} {
    font-size: 0.9rem;
    &:not(:last-child) {
      margin-right: 20px;
    }
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
  width: 20vw;
  background-color: ${(props) => props.theme.colors.inputBackdrop};
  border-radius: 5px;
  @media ${device.phone} {
    width: 35vw;
  }
`;

const Input = styled.input`
  all: unset;
  margin-left: 15px;
  width: 100%;
  &::placeholder {
    color: ${(props) => props.theme.colors.placeholder};
    font-size: 0.9rem;
    @media ${device.tablet} {
      font-size: 0.7rem;
    }
    @media ${device.phone} {
      color: transparent;
    }
  }
`;

const Logo = styled.div`
  background-image: url("https://i.ibb.co/Vx6sB24/logo.png");
  background-size: cover;
  width: 150px;
  height: 35px;
  @media ${device.phone} {
    background-image: url("https://i.ibb.co/pKBtXNb/square-Logo.png");
    background-size: cover;
    width: 35px;
    height: 35px;
  }
`;

const StyledIcon = styled.i`
  color: ${(props) => props.theme.colors.placeholder};
  font-size: 1rem;
`;

export default withRouter(({ location: { pathname } }) => {
  const { setTerm } = useContext(SearchContext);
  const [query, setQuery] = useState("");
  const LinkRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    setTerm(query);
    LinkRef.current.click();
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
              <Logo alt="Logo Placeholder" />
            </StyledLink>
          </Item>
          <Item current={pathname === "/"}>
            <StyledLink to="/">영화</StyledLink>
          </Item>
          <Item current={pathname === "/shows"}>
            <StyledLink to="/shows">TV</StyledLink>
          </Item>
        </List>
      </HeaderDiv>
      <HeaderDiv>
        <Item>
          <Form
            // action="/search"
            // type="get"
            onSubmit={handleSubmit}
          >
            <SearchBar>
              <Link to="/search" ref={LinkRef}>
                <StyledIcon className="fas fa-search" />
              </Link>
              <Input
                name="query"
                placeholder="작품, 제목, 배우, 감독을 검색해보세요."
                onChange={onChange}
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
