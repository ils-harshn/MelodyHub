const { keyframes } = require("styled-components");

export const scaleInEffect = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;