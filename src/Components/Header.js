import React, { useCallback, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import globalSize from "../Style/globalSize";
import { device } from "../Style/devices";
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
  padding: ${globalSize.bodySidePadding};
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
  min-width: fit-content;
  &:not(:last-child) {
    margin-right: 30px;
  }
  @media ${device.phone} {
    font-size: 0.9rem;
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
  background-color: #f5f5f7;
  @media ${device.phone} {
    width: 35vw;
  }
`;

const Input = styled.input`
  all: unset;
  margin-left: 15px;
  width: 100%;
  &::placeholder {
    color: rgba(0, 0, 0, 0.2);
    font-size: 0.9rem;
    @media ${device.phone} {
      color: transparent;
    }
  }
`;

const Logo = styled.div`
  background-image: url("https://via.placeholder.com/150x35");
  width: 150px;
  height: 35px;
  @media ${device.phone} {
    background-image: url("https://via.placeholder.com/35");
    width: 35px;
    height: 35px;
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
