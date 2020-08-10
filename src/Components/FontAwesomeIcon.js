import React from "react";
import styled from "styled-components";

const Icon = styled.i`
  color: ${(props) => props.color};
`;

const FontAwesomeIcon = (props) => {
  return <Icon className={props.class} color={props.color} />;
};

export default FontAwesomeIcon;
