import React, { ReactElement } from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

// Types
import { Theme } from "../@types/style";

/*
==========================
    Styled Components
==========================
*/
const FooterContainer = styled.footer`
  /* Display */
  display: flex;
  justify-content: center;
  align-items: center;

  /* Position */
  position: fixed;
  bottom: 0;

  /* Size */
  width: 100%;
  height: 80px;

  /* Style */
  background: ${({ theme }: { theme: Theme }): string => theme.navColor};

  /* Border */
  border-top: 1px solid
    ${({ theme }: { theme: Theme }): string => theme.borderColor};

  /* Font */
  font-size: 1.2em;

  /* Responsive Desktop */
  @media only screen and (min-width: 550px) {
    /* Position */
    position: static;
  }
`;

const MenuContainer = styled.ul`
  /* Display */
  display: flex;
  justify-content: space-around;
  align-items: center;

  /* Size */
  width: 100%;
  height: 100%;
  padding: 0;

  /* List style */
  list-style-type: none;
`;

const MenuMobileButton = styled.li<{ current: boolean }>`
  /* Flexbox */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* Font Style */
  font-size: 0.75em;
  color: ${({ current, theme }: { current: boolean; theme: Theme }): string =>
    current ? theme.enabled : theme.disabled};
`;

const StyledLink = styled(Link)<{ icon: string }>`
  /* Gridbox */
  display: grid;
  place-items: center;

  /* Size */
  width: 100%;
  height: 100%;

  /* Font Style */
  text-decoration: none;
  color: inherit;
  &:visited {
    color: inherit;
  }
`;

const FontAwesomeIcon = styled.i`
  /* Font Style */
  font-size: 1.5em;

  /* Margin */
  margin-bottom: 10px;
`;

/*
==========================
    React Element
==========================
*/
const Footer = withRouter(
  ({ location: { pathname } }): ReactElement => (
    <FooterContainer>
      <MenuContainer>
        <StyledLink to="/" icon="movie">
          <MenuMobileButton
            current={pathname === "/" || pathname.includes("movie")}
          >
            <FontAwesomeIcon className="fas fa-film" />
            <span>영화</span>
          </MenuMobileButton>
        </StyledLink>
        <StyledLink to="/shows" icon="show">
          <MenuMobileButton
            current={pathname === "/shows" || pathname.includes("show")}
          >
            <FontAwesomeIcon className="fas fa-tv" />
            <span>TV</span>
          </MenuMobileButton>
        </StyledLink>
        <StyledLink to="/search" icon="search">
          <MenuMobileButton
            current={pathname === "/search" || pathname === "/results"}
          >
            <FontAwesomeIcon className="fas fa-search" />
            <span>검색</span>
          </MenuMobileButton>
        </StyledLink>
        <StyledLink to="/settings" icon="settings">
          <MenuMobileButton current={pathname === "/settings"}>
            <FontAwesomeIcon className="fas fa-cog" />
            <span>설정</span>
          </MenuMobileButton>
        </StyledLink>
      </MenuContainer>
    </FooterContainer>
  )
);

export default Footer;
