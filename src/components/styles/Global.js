import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    
    *, *::before, *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    /* #root {
      padding: 0;
    } */

    body {
        font-family: 'Atkinson Hyperlegible', sans-serif;
        font-size: 1rem;
        
    }

    a {
      text-decoration: none;
      color: inherit;
    }

    button {
        font-family: 'Atkinson Hyperlegible', sans-serif;
        -webkit-tap-highlight-color: transparent;
    }
`;

export default GlobalStyles;