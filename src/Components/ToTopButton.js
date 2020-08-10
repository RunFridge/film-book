import React from "react";
import styled from "styled-components";
import colors from "../Style/colors";
import vars from "../Style/vars";
import FontAwesomeIcon from "./FontAwesomeIcon";

const ButtonContainer = styled.div`
  ${vars.flexCenter};
  cursor: pointer;
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 15px;
  background: ${colors.slightTransparentWhite};
  box-shadow: ${vars.coolBoxShadow};
`;

const ToTopButton = () => {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <ButtonContainer onClick={scrollTop}>
      <FontAwesomeIcon
        class="fas fa-chevron-up"
        color={colors.darkBg}
        hoverColor={colors.primary}
        size="2rem"
      />
    </ButtonContainer>
  );
};

export default ToTopButton;
