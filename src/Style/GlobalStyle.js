import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { GmarketSansLight } from "./fonts";

const GlobalStyles = createGlobalStyle`
    ${reset};
    ${GmarketSansLight};
    *{
        box-sizing:border-box;
    }
    body{
        font-family: 'GmarketSansLight', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        padding-top: 80px;
        color: ${(props) => props.theme.colors.mainText};
        background-color: ${(props) => props.theme.colors.mainBg};
        transition-duration: 0.5s;
    }
    h1 {
        font-size: 2rem;
    }
`;

export default GlobalStyles;
