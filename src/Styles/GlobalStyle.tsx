import { createGlobalStyle } from "styled-components";
import { Theme } from "../@types/style";

const GlobalStyle = createGlobalStyle`
    /* Reset Margins */
    *, *::before, *::after {
        margin: 0;
    };

    /* Import Font */
    @font-face {
        font-family: Nato Sans KR;
        src: url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;700&display=swap');
    }

    /* Global body style */
    body {
        font-family: "Noto Sans KR", sans-serif;
        background: ${({ theme }: { theme: Theme }) => theme.bgPrimary}
    }
`;

export default GlobalStyle;
