import { createGlobalStyle } from 'styled-components';

export const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    border: 0;
    outline: none;
    box-sizing: border-box;
  }

  button, input, html, #root{
    font-family: 'Roboto', Arial, Helvetica, sans-serif;
    font-size: 16px;
  }
`;
