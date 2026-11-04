import React from "react";
import styled from "styled-components";

const GradientDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(60% 60% at 50% 50%, ${props => props.color1} 0%, ${props => props.color2} 100%);
  z-index: -1;
`;

const GradientBackground = ({ color1, color2 }) => {
  return <GradientDiv color1={color1} color2={color2} />;
};

export default GradientBackground;