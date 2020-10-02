import React, { ReactElement } from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import { device } from "../Styles/Responsive";

// Hooks
import useScreenSize from "../Hooks/useScreenSize";

// Types
import { Theme } from "../@types/style";

// Components
import SearchBar from "../Components/SearchBar";

/*
==========================
    Styled Components
==========================
*/
const NavContainer = styled.header`
  /* Position */
  position: sticky;
  top: 0;
  z-index: 10;

  /* Display */
  display: flex;
  align-items: center;

  /* Size */
  height: 80px;

  /* Style */
  background: ${({ theme }: { theme: Theme }): string => theme.navColor};

  /* Responsive Desktop */
  ${device.desktop} {
    /* Style */
    box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 0px 0px;

    /* Size */
    height: 60px;
    padding: 0 60px;
  }
`;

const MenuContainer = styled.ul`
  /* Display */
  display: flex;
  align-items: center;

  /* Size */
  width: 100%;
  padding: 0;

  /* List style */
  list-style-type: none;

  ${device.desktop} {
  }
`;

const Logo = styled.img`
  /* Display */
  display: none;

  /* Size */
  height: 55px;

  ${device.desktop} {
    display: block;
  }
`;

const MobileMenuItem = styled.li<{ current: boolean }>`
  /* Size */
  padding: 0 15px;

  /* Font */
  font-size: 1.5em;
  font-weight: bold;
  color: ${({ current, theme }: { current: boolean; theme: Theme }): string =>
    current ? theme.enabled : theme.disabled};

  /* Menu divider (imported from https://pedia.watcha.com/ko-KR) */
  &:not(:last-child)::after {
    content: "";
    display: inline-block;
    position: relative;
    left: 15px;
    background: rgb(209, 209, 210);
    width: 1px;
    height: 13px;
    ${device.desktop} {
      display: none;
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

/*
==========================
    React Element
==========================
*/
const Header = withRouter(
  ({ location: { pathname } }): ReactElement => {
    const [width, height] = useScreenSize();
    return (
      <NavContainer>
        <Link to="/">
          <Logo src={require("../Assets/logo.png")} />
        </Link>
        <MenuContainer>
          <MobileMenuItem
            current={pathname === "/" || pathname.includes("movie")}
          >
            <StyledLink to="/">영화</StyledLink>
          </MobileMenuItem>
          <MobileMenuItem
            current={pathname === "/shows" || pathname.includes("show")}
          >
            <StyledLink to="/shows">TV 프로그램</StyledLink>
          </MobileMenuItem>
          <MobileMenuItem current={pathname === "/settings"}>
            <StyledLink to="/settings">설정</StyledLink>
          </MobileMenuItem>
        </MenuContainer>
        <SearchBar />
      </NavContainer>
    );
  }
);

export default Header;
