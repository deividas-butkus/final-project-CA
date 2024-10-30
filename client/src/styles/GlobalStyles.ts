import { createGlobalStyle } from "styled-components";
import "normalize.css";

const GlobalStyles = createGlobalStyle`
  body {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    font-weight: 400;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  h2 {
    font-weight: 300;
  }

  h3 {
    font-weight: 300;
  }

  a {
    text-decoration: none;
    transition: transform 0.2s ease;
    &:hover {
      transform: scale(1.05);
    }
  }

  button {
    transition: transform 0.2s ease;
    &:hover {
      transform: scale(1.05);
    }
  }

`;

export default GlobalStyles;
