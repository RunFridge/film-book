import React from "react";
import styled from "styled-components";
import colors from "../Style/colors";

const Icon = styled.i`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
`;

const FontAwesomeIcon = (props) => {
  return props.class ? (
    <Icon
      className={props.class}
      color={props.color ? props.color : colors.darkBg}
      size={props.size ? props.size : "1rem"}
    />
  ) : null;
};

export default FontAwesomeIcon;
