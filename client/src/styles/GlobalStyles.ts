import { createGlobalStyle } from "styled-components";
import "normalize.css";

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
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

  header, main, p.tokenExpirationTimerPar, footer {
    padding: 0 5%;
  }

  p.tokenExpirationTimerPar {
    margin-bottom: 7px;
  }

  h2, h3, h4, p {
    font-weight: 300;
  }

  a {
    text-decoration: none;
    transition: transform 0.2s ease;
    transform-origin: center;
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

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: #ccc;
    border-radius: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background: #5B5C5C;
    border-radius: 10px;
    &:hover {
      background: #555;
    }
  }

  html {
    ${({ theme }) => theme.media.tablet} {
      font-size: 18px;
    }
    ${({ theme }) => theme.media.desktop} {
      font-size: 20px;
    }
  }

  header, main, p.tokenExpirationTimerPar, footer {
    ${({ theme }) => theme.media.mobile} {
      padding: 0 10%;
    }
    ${({ theme }) => theme.media.tablet} {
      padding: 0 15%;
    }
    ${({ theme }) => theme.media.desktop} {
      padding: 0 20%;
    }
  }
`;

export default GlobalStyles;
