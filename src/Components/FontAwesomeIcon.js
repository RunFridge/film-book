import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import colors from "../Style/colors";

const Icon = styled.i`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  &:hover {
    color: ${(props) => props.hoverColor};
  }
`;

const FontAwesomeIcon = (props) => {
  return props.class ? (
    <Icon
      className={props.class}
      color={props.color ? props.color : colors.darkBg}
      hoverColor={props.hoverColor ? props.hoverColor : props.color}
      size={props.size ? props.size : "1rem"}
    />
  ) : null;
};

FontAwesomeIcon.propTypes = {
  className: PropTypes.string.isRequired,
  color: PropTypes.string,
  hoverColor: PropTypes.string,
  size: PropTypes.string,
};

export default FontAwesomeIcon;
