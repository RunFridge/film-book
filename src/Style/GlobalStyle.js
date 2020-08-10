import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { Cafe24Simplehae } from "./fonts";
import vars from "./vars";

const GlobalStyles = createGlobalStyle`
    ${reset};
    ${Cafe24Simplehae};
    *{
        box-sizing:border-box;
    }
    body{
        font-family: 'Cafe24Simplehae', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        padding: ${vars.bodySidePadding};
        padding-top: 80px;
    }
    h1 {
        font-size: 2rem;
    }
`;

export default GlobalStyles;
