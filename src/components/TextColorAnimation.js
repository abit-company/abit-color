import styled, { keyframes } from "styled-components";

const colorKeyframes = props => keyframes`
  0% {
    color: ${props.theme.colorPalette[0]};
  }
  25% {
    color: ${props.theme.colorPalette[1]};
  }
  50% {
    color: ${props.theme.colorPalette[2]};
  }
  75% {
    color: ${props.theme.colorPalette[3]};
  }
  100% {
    color: ${props.theme.colorPalette[4]};
  }
`;

export default styled.span`
  animation: ${colorKeyframes} 3s linear infinite alternate;
`;
