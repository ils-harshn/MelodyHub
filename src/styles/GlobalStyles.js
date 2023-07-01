import { createGlobalStyle, css } from "styled-components";

const GlobalStyles = createGlobalStyle`
  ${({ theme, changedTheme }) => css`
        body {
          margin: 0;
          padding: 0;
          background-color: ${theme.colors.bodyBackground};
          color: ${theme.colors.bodyColor};
          font-family: Inter;
          transition: ${changedTheme ? "background-color 100ms ease" : "none"};
        }

        * {
          margin: 0;
          padding: 0;

          transition: ${changedTheme ? "background-color 100ms ease" : "none"};
          transition: ${changedTheme ? "color 50ms ease" : "none"};
        }

        /* ::-webkit-scrollbar {
          width: 6px;
        } */

        /* Track */
        /* ::-webkit-scrollbar-track {
          background: #fff1d9; 
        } */
        
        /* Handle */
        /* ::-webkit-scrollbar-thumb {
          background: #ffbe47;
          border-radius: 7px;
        } */

        /* Handle on hover */
        /* ::-webkit-scrollbar-thumb:hover {
          background: #ffa500; 
        } */
    `}
`

export default GlobalStyles