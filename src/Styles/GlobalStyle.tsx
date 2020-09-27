import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    /* Reset Margins */
    *, *::before, *::after {
        margin: 0;
    };

    /* Import Font */
    @font-face { 
        font-family: 'JSDongkang-Regular'; 
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/JSDongkang-RegularA1.woff') format('woff'); 
        font-weight: normal; 
        font-style: normal; 
    }

    /* Global body style */
    body {
        font-family: JSDongkang-Regular, "sans-serif";
    }
`;

export default GlobalStyle;
