import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html,
  body {
    margin: 0;
    height: 100vh;
    font-family: "Karla Regular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  }

  @-webkit-keyframes pop {
    0% {
      top: 6px;
      height: 46px;
    }

    50%, 100% {
      top: 19px;
      height: 21px;
    }
  }

  @keyframes pop {
    0% {
      top: 6px;
      height: 46px;
    }
    
    50%, 100% {
      top: 19px;
      height: 21px;
    }
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

  @-webkit-keyframes fadeIn {
    from {
      opacity: 0;
    }
  
    to {
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
  
    to {
      opacity: 1;
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
