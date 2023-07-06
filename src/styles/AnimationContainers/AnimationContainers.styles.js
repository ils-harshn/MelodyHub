const { keyframes } = require("styled-components");

export const scaleInEffect = keyframes`
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const StatusInEffect = keyframes`
  from {
    transform: translateY(-10px);
    opacity: 0;
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;