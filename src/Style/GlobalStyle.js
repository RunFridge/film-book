import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { GmarketSansLight } from "./fonts";
import globalSize from "./globalSize";
import colors from "./colors";

const GlobalStyles = createGlobalStyle`
    ${reset};
    ${GmarketSansLight};
    *{
        box-sizing:border-box;
    }
    body{
        font-family: 'GmarketSansLight', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        padding: ${globalSize.bodySidePadding};
        padding-top: 80px;
        color: ${colors.darkBg};
    }
    h1 {
        font-size: 2rem;
    }
`;

export default GlobalStyles;
