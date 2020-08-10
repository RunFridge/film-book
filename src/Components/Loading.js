/* Loader from https://loading.io/css/ */
import React from "react";
import styled from "styled-components";
import colors from "../Style/colors";
import globalSize from "../Style/globalSize";

const Loader = styled.div`
  width: 100vw;
  height: 30vw;
  position: fixed;
  top: 0;
  left: 0;
  background: transparent;
  ${globalSize.flexCenter};

  .lds-ring {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid #fff;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${colors.primary} transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loading = () => (
  <Loader>
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </Loader>
);

export default Loading;
