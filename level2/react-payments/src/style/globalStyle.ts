import styled, { createGlobalStyle } from 'styled-components';
import resetStyle from './resetStyle';

const GlobalStyle = createGlobalStyle`
  ${resetStyle}

  body {
    background-color: white;
  }

  input {
    box-sizing: border-box;
  }

  button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    background-color: white;
  }
`;

export const GlobalLayout = styled.div`
  background-color: white;
  width: 400px;
  min-height: 100vh;
  margin: 0 auto;
`;

export default GlobalStyle;
