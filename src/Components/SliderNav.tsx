import React, { ReactElement } from "react";
import styled from "styled-components";
import { device } from "../Styles/Responsive";

// Types
import { Theme } from "../@types/style";

const ArrowLeft = (): ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
  </svg>
);

const ArrowRight = (): ReactElement => (
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

const LeftWrapper = styled.div<{ disabled: boolean }>`
  ${SVGWrapper};
  fill: ${({ disabled, theme }: { disabled: boolean; theme: Theme }) =>
    disabled ? theme.disabled : theme.enabled};
  left: 0;
  cursor: ${({ disabled }) => (disabled ? "normal" : "pointer")};
`;

const RightWrapper = styled.div<{ disabled: boolean }>`
  ${SVGWrapper};
  fill: ${({ disabled, theme }: { disabled: boolean; theme: Theme }) =>
    disabled ? theme.disabled : theme.enabled};
  right: 0;
  cursor: ${({ disabled }) => (disabled ? "normal" : "pointer")};
`;

export const PrevNav = ({
  disabled,
  prev,
}: {
  disabled: boolean;
  prev: Function;
}) => {
  return (
    <LeftWrapper disabled={disabled} onClick={() => prev()}>
      <ArrowLeft />
    </LeftWrapper>
  );
};

export const NextNav = ({
  disabled,
  next,
}: {
  disabled: boolean;
  next: Function;
}) => {
  return (
    <RightWrapper disabled={disabled} onClick={() => next()}>
      <ArrowRight />
    </RightWrapper>
  );
};
