import { createGlobalStyle } from 'styled-components';

export const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    border: 0;
    outline: none;
    box-sizing: border-box;
  }

  button, textarea, input, html, #root{
    font-family: 'Roboto', Arial, Helvetica, sans-serif;
    font-size: 16px;
  }

  #root {
    width: 100%;
    height: 100vh;
    position: relative;
  }

  button {
    cursor: pointer;
    transition: filter 0.3s;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;
