import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    margin: 0;
    height: 100vh;
    font-family: "Karla Regular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  }

  @-webkit-keyframes delay {
    0%, 40%, 100% { 
      -webkit-transform: scaleY(0.05);
    }  

    20% { 
      -webkit-transform: scaleY(1.0); 
    }
  }
  
  @keyframes delay {
    0%, 40%, 100% { 
      transform: scaleY(0.05);
      -webkit-transform: scaleY(0.05);
    }  
    
    20% { 
      transform: scaleY(1.0);
      -webkit-transform: scaleY(1.0);
    }
  }

  *, ::after, ::before {
    box-sizing: border-box;
  }

  ::-webkit-scrollbar {
    width: 0;
  }
`;

export default GlobalStyle;
