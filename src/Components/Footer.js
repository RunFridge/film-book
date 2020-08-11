import React from "react";
import styled from "styled-components";
import vars from "../Style/vars";
import ToTopButton from "./ToTopButton";

const FooterContainer = styled.footer`
  margin-top: 30px;
  height: 250px;
  ${vars.flexCenter};
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.footerBg};
  color: ${(props) => props.theme.colors.primary};
  user-select: none;
`;

const Title = styled.h1`
  font-weight: bold;
`;

const StyledIcon = styled.i`
  color: ${(props) => props.theme.colors.enabledIcon};
  font-size: 3rem;
`;

const LogoWrapper = styled.div`
  margin: 20px;
  width: 10vw;
  display: flex;
  justify-content: space-around;
`;

const CopyRight = styled.span`
  color: ${(props) => props.theme.colors.secondary};
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Title>FilmBook</Title>
      <LogoWrapper>
        <a
          href="https://github.com/RunFridge/film-book"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StyledIcon className="fab fa-github" />
        </a>
      </LogoWrapper>
      <CopyRight>&copy; FilmBook 2020</CopyRight>
      <ToTopButton />
    </FooterContainer>
  );
};

export default Footer;
