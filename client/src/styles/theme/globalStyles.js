import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    margin: 0;
    height: 100vh;
    font-family: "Karla Regular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  }

  *, ::after, ::before {
    box-sizing: border-box;
  }

  ::-webkit-scrollbar {
    width: 0;
  }
`;

export default GlobalStyle;
