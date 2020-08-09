import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { Cafe24Simplehae } from "./fonts";

const GlobalStyles = createGlobalStyle`
    ${reset};
    ${Cafe24Simplehae};
    *{
        box-sizing:border-box;
    }
    body{
        font-family: 'Cafe24Simplehae', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
`;

export default GlobalStyles;
