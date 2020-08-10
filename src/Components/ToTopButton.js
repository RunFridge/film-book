import React from "react";
import styled from "styled-components";
import vars from "../Style/vars";

const ButtonContainer = styled.div`
  ${vars.flexCenter};
  cursor: pointer;
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 15px;
  background: ${(props) => props.theme.colors.enabledIcon};
  box-shadow: ${vars.coolBoxShadow};
  z-index: 15;
`;

const StyledIcon = styled.i`
  color: ${(props) => props.theme.colors.disabledIcon};
  font-size: 2rem;
  &:hover {
    color: ${(props) => props.theme.colors.enabledBtn};
  }
`;

const ToTopButton = () => {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <ButtonContainer onClick={scrollTop}>
      <StyledIcon className="fas fa-chevron-up" />
    </ButtonContainer>
  );
};

export default ToTopButton;
