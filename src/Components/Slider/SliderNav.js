import React from "react";
import styled from "styled-components";
import { device } from "../../Style/devices";

const ArrowLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
  </svg>
);

const ArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
  </svg>
);

const SVGWrapper = `
  width: 3rem;
  height: 3rem;
  position: absolute;
  z-index: 5;
  top: 35%;
  filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, .2));
`;

const LeftWrapper = styled.div`
  ${SVGWrapper};
  fill: ${(props) =>
    props.disabled
      ? props.theme.colors.disabledBtn
      : props.theme.colors.enabledBtn};
  left: ${(props) => props.navMargin};
  @media ${device.phone} {
    left: 10px;
  }
  cursor: ${(props) => (props.disabled ? "normal" : "pointer")};
`;

const RightWrapper = styled.div`
  ${SVGWrapper};
  fill: ${(props) =>
    props.disabled
      ? props.theme.colors.disabledBtn
      : props.theme.colors.enabledBtn};
  right: ${(props) => props.navMargin};
  @media ${device.phone} {
    right: 10px;
  }
  cursor: ${(props) => (props.disabled ? "normal" : "pointer")};
`;

export const PrevNav = ({ disabled, prev, navMargin }) => {
  return (
    <LeftWrapper
      disabled={disabled}
      onClick={() => prev()}
      navMargin={navMargin}
    >
      <ArrowLeft />
    </LeftWrapper>
  );
};

export const NextNav = ({ disabled, next, navMargin }) => {
  return (
    <RightWrapper
      disabled={disabled}
      onClick={() => next()}
      navMargin={navMargin}
    >
      <ArrowRight />
    </RightWrapper>
  );
};
