import React, { ReactElement } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

// Type
import { Theme } from "../@types/style";

/*
==========================
    Styled Components
==========================
*/
const LoadingWrapper = styled.div`
  /* Size */
  height: calc(100vh - 160px);

  /* Style */
  background: ${({ theme }: { theme: Theme }) => theme.bgPrimary};
  color: ${({ theme }: { theme: Theme }) => theme.enabled};
`;
const Loader = styled.div`
  /* Flexbox */
  display: flex;
  justify-content: center;
  align-items: center;

  /* Size */
  width: 100%;
  height: 100%;

  /* Imported from loading.io/css */
  .lds-ripple {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-ripple div {
    position: absolute;
    border: 4px solid ${({ theme }: { theme: Theme }) => theme.primary};
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  .lds-ripple div:nth-child(2) {
    animation-delay: -0.5s;
  }
  @keyframes lds-ripple {
    0% {
      top: 36px;
      left: 36px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 0px;
      left: 0px;
      width: 72px;
      height: 72px;
      opacity: 0;
    }
  }
`;

/*
==========================
    React Element
==========================
*/
const Loading = (): ReactElement => {
  return (
    <LoadingWrapper>
      <Helmet>
        <title>Film Book 2.0 | Loading</title>
      </Helmet>
      <Loader>
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </Loader>
    </LoadingWrapper>
  );
};

export default Loading;
