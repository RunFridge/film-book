import React from "react";
import styled from "styled-components";
import vars from "../Style/vars";
import colors from "../Style/colors";
import FontAwesomeIcon from "../Components/FontAwesomeIcon";

const FooterContainer = styled.footer`
  margin-top: 30px;
  height: 250px;
  ${vars.flexCenter};
  flex-direction: column;
  background-color: ${colors.darkBg};
  color: ${colors.primary};
`;

const Title = styled.h1`
  font-weight: bold;
`;

const LogoWrapper = styled.div`
  margin: 20px;
  width: 10vw;
  display: flex;
  justify-content: space-around;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Title>FilmBook</Title>
      <LogoWrapper>
        <a
          href="https://github.com/hwhang0917"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon class="fab fa-github" color="white" size="3rem" />
        </a>
      </LogoWrapper>
      <span>&copy; FilmBook 2020</span>
    </FooterContainer>
  );
};

export default Footer;
