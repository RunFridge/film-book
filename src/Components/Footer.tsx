import React, { ReactElement } from "react";
import styled from "styled-components";

// Types
import { Theme } from "../@types/style";

const FooterContainer = styled.footer`
  /* Display */
  display: flex;
  justify-content: center;
  align-items: center;

  /* Position */
  position: fixed;
  bottom: 0;

  /* Size */
  width: 100%;
  height: 80px;

  /* Style */
  background: ${({ theme }: { theme: Theme }): string => theme.navColor};

  /* Border */
  border-top: 1px solid
    ${({ theme }: { theme: Theme }): string => theme.borderColor};

  /* Font */
  font-size: 1.2em;
  color: ${({ theme }: { theme: Theme }): string => theme.enabled};
`;

const Footer = (): ReactElement => <FooterContainer>Footer</FooterContainer>;

export default Footer;
